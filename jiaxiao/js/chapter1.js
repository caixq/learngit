

/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03

    @descreption 
    在进入练习页面时提醒用户 是否从上次推出的题目序号开始做

    收藏本题、取消收藏的功能切换

    排除本题、回复本题的功能切换

    键盘向左向右 控制上一题下一题


*/

var mainCookie = $("#jiakao-data-cketype").val();
var childCookie = "";


if($("#jiakao-data-clevel1").val() == "0" || $("#jiakao-data-clevel1").val() == ""){
    childCookie = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#jiakao-data-cate").val();
}else{
    childCookie = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#jiakao-data-clevel1").val();
}


$(function(){

    if(mainCookie == "jiakao.sct"){
        $("#collection").text("取消收藏");
    }
    if(mainCookie == "jiakao.pct"){
        $("#collection").text("恢复本题");
    }
    var index = 1;

    //在顺序练习、章节练习、专项练习中记录用户的答题序号，并在进入该类时提示用户
    if(($("#jiakao-data-cketype").val() != "jiakao.sct") && ($("#jiakao-data-cketype").val() != "jiakao.pct") && ($("#jiakao-data-cketype").val() != "jiakao.ct")){
        index = storage.get(mainCookie,childCookie);

        if(!index || index == "" || index == "1"){
            index = 1;
            getModel(index);
        }else{
            var indexHtml = "<div class='index'><p>上次练习到第"+index+"题，是否继续？</p><div class='btn'><p class='yes' onclick='hideshowlogindiv(\"append_parent\");getModel("+index+")'>是</p><p class='no' onclick='hideshowlogindiv(\"append_parent\");getModel(1)'>否</p></div></div>";
            ShowDialogo.show(" <div class='tanceng_tips'><h3>提示：</h3></div>",'150px','500px', indexHtml, true);

        } 
    }else{
        //在错题、排除题、收藏题时不记录用户答题序号，直接从第一题开始
        getModel(1);
        
    } 

	var allcount = $("#jiakao-data-qcount").val();
	$(".quallcount").text(allcount);
	$(".nowCount").text(String(index)) ;
	$("#tiao").val(String(index));
	
	$("#skip").on("click",function(){
		go($("#tiao").val());
	});

	$("#expl").on("click",function(){
		showExplainnation();
	});

(function(){
    //收藏
    $("#collection").on("click", function() {
        var mainCookie = "jiakao.sct";
        var subCookie = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#trueChapter").val();
        if($(this).text() == "收藏本题"){
            sc_pc_rm.store(this,mainCookie,subCookie,"取消收藏");
        }else{
            sc_pc_rm.removeCk(this,mainCookie,subCookie,"收藏本题");
        }
});

})();

    

    
    //几个操作按钮加效果，可以看出点击过了
    $(".turn p").on("mousedown",function(e){
        var eve = e ||  window.event;
        var target = e.target || e.srcElement;
        target.style.background = "#da7113";
    });

    $(".turn p").on("mouseup",function(e){
        var eve = e ||  window.event;
        var target = e.target || e.srcElement;
        target.style.background = "#f78015";
    });

    
//排除、恢复
(function(){
     $("#remove").on("click",function(){
        //排除本题
        var mainCookie = "jiakao.pct";
        var subCookie = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#trueChapter").val();
        if($(this).text() == "排除本题"){
            sc_pc_rm.store(this,mainCookie,subCookie,"恢复本题");
        }else{
            sc_pc_rm.removeCk(this,mainCookie,subCookie,"排除本题");
        }
        
        //删除对应的随机数
        randomArray.splice(jQuery.inArray($("#random").val(), randomArray),1);
    });

})();

//从错题簿中移出错题 
(function(){
     $("#removeCT").on("click",function(){
        //排除本题
        var mainCookie = "jiakao.ct";
        var subCookie = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#trueChapter").val();
        if($(this).text() == "移出错题库"){
            sc_pc_rm.removeCk(this,mainCookie,subCookie,"移入错题库");
        }else{
            sc_pc_rm.store(this,mainCookie,subCookie,"移出错题库");
        }
    });

})();
   
    

    //键盘向左向右 控制上一题下一题
	document.onkeyup = function(e) {
        if (!e)
            var e = window.event;
        var keycode = e.keyCode || e.which;
        if (keycode) {
            if (keycode == 37) {
                //上一题
                go('-1');
            } else if (keycode == 39) {
                //下一题
                go('0');
            }else if(keycode == 13){
                $('#searchbtn').click();
            } 
        }
    }


});

