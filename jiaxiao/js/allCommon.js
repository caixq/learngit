
/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03

    @descreption 
    function ShowDialog() 弹出层的加载、位置控制，
    function createBgshowlogindiv() 弹出层的背景设置
    function tjanswer() 练习的单选提交答案并判断，
    function tjanswer2() 练习的多选提交答案并判断
    function go()  题目的跳转，
    function getModel()  向后台请求题目，
    function itemsshow()  向页面添加题目，选项，答案，图片，swf视频
    function showExplainnation()  本题解释
    function cookieUtil  cookie的操作（有主cookie，有子cookie）
    function getRandom(n)  //产生n个互不相同的随机数，保存到return_array
    function InArray(str,array) //判断字符串是否在数组中
    sc_pc_rm  //收藏、排除本题 和移出错题的方法 

*/

//添加弹层中的dom节点和样式，并对弹层增加拖动功能
var isshowbg = true;

function ShowDialog() {
    this.msgobjname = "";
    this.show = function (title, height, width, msg, isshowbg) {
        var htmlstr = "";
        var mmmid = "append_parent";
        if (document.getElementById(mmmid) != null) { return; };
        var div = document.createElement("div");
        div.id = mmmid;
        div.style.cssText = "position: absolute;z-index:999";
        var htmlstr = "";
        htmlstr += "<table cellspacing=\"0\" cellpadding=\"0\" class=\"fwin\" canmove=\"true\" style=\"empty-cells: show;border-collapse: collapse;\">"
            + "<tbody><tr><td class=\"t_l\"  style=\"cursor: move\" canmove=\"true\"></td><td><div style=\"cursor: move\" class=\"t_c\" canmove=\"true\"></div></td><td class=\"t_r\"  style=\"cursor: move\" canmove=\"true\"></td></tr>"
            + "<tr><td style=\"cursor: move\" class=\"m_l\" canmove=\"true\"> </td>"
            + "<td id=\"fwin_content_login\" class=\"m_c\" style=\"background:#fff\" fwin=\"login\">"
            + title;
        htmlstr += "<div class=\"c cl\" style=\"height:" + height + "; width:" + width + "; overflow:hidden\" id=\"showdialog_maindiv\">";
        htmlstr += msg;
        htmlstr += "</div></div>";
        htmlstr += "</div></td><td style=\"cursor: move\" canmove=\"true\" class=\"m_r\"></td></tr><tr><td class=\"b_l\"  style=\"cursor: move\" canmove=\"true\" ></td><td style=\"cursor: move\" canmove=\"true\" class=\"b_c\"></td><td class=\"b_r\"  style=\"cursor: move\" canmove=\"true\"></td></tr></tbody></table>";
        htmlstr += "</div>";
        div.innerHTML = htmlstr;
        document.body.appendChild(div);
        div.style.left = String(((document.documentElement.clientWidth - div.offsetWidth) / 2)+8) + "px";
        //div.style.top = String(document.documentElement.scrollTop + 40 + (document.getElementById("main_M").clientHeight - div.offsetHeight) / 2) + "px";
        var scrollTop = 0;
        var clientHeight = 0;
        var __top = 0;
        if(window.top != window.self){
            scrollTop = window.top.document.body.scrollTop || window.top.document.documentElement.scrollTop || 0;
            scrollTop = scrollTop - 185;
            clientHeight = window.top.document.documentElement.clientHeight;
            __top = scrollTop + (clientHeight - div.offsetHeight - 207) / 2;
        }else{
            scrollTop =  document.body.scrollTop || document.documentElement.scrollTop || 0;
            clientHeight = document.documentElement.clientHeight;
            __top = scrollTop + (clientHeight - div.offsetHeight) / 2;
        }
        if(__top <= 0){
            __top = 0;
        }
        div.style.top = String(__top) + "px";
        var md = false, mobj, ox, oy;
        document.onmousedown = function (ev) {
            var ev = ev || window.event;
            var evt = ev.srcElement || ev.target;
            if (typeof (evt.getAttribute("canmove")) == "undefined") {
                return;
            }
            if (evt.getAttribute("canmove")) {
                md = true;
                mobj = document.getElementById("append_parent");
                ox = mobj.offsetLeft - ev.clientX;
                oy = mobj.offsetTop - ev.clientY;
            }
        }
        document.onmouseup = function () {
            md = false;
        }
        document.onmousemove = function (ev) {
            var ev = ev || window.event;
            if (md) {
                mobj.style.left = (ev.clientX + ox) + "px";
                mobj.style.top = (ev.clientY + oy) + "px";
            }
        }
        if (isshowbg) createBgshowlogindiv('#000000', 'fathershowlogindiv');
    }

}
// 创建背景层
function createBgshowlogindiv(color, id) {

    var width = document.body.scrollWidth;
    var height = document.body.scrollHeight;
    if (document.documentElement) {
        width = Math.max(width, document.documentElement.scrollWidth);
        height = Math.max(height, document.documentElement.scrollHeight);
    }
    var div = document.createElement("div");
    div.id = id;
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.zIndex = "998";
    div.style.background = color;

//window.ActiveXObject
    if (document.body.filters)
        div.style.filter = "alpha(opacity=20)";
    else
        div.style.opacity = "0.2";
    
    document.getElementsByTagName("body")[0].appendChild(div);
}


var ShowDialogo = new ShowDialog(); //设置对象名,供内部引用 
ShowDialogo.msgobjname = "ShowDialogo"; //定义回调函数

//练习时，单选时提交答案
function tjanswer(answer,bestAnswer,index){
    if($("#rightanswer").html()) { return ;}
    for(var i=0,len=$("#ul_answers input").length;i<len;i++){
        $("#ul_answers input")[i].disabled = "disabled";
    }
    var flag = false;
    if ($("#TrueNum") != null) {
        flag = true;
    }
    if (flag == true) {
        var alltrue = parseInt($("#TrueNum").text());
        var allfalse = parseInt($("#FalseNum").text());
    }
    if(answer == bestAnswer){
        var resulthtml = "<b class='bingo'>恭喜你，答对了！</b><i onclick='showExplainnation()'>为什么选"+bestAnswer+"？</i>";
        $("#rightanswer").html(resulthtml);
        if(flag){
            alltrue += 1;
            $("#TrueNum").text(alltrue);
        }
        if($(".AutoNextTmp").attr("checked") == "checked"){
            setTimeout("go(0)",1000);
        }
        
    }else{
        var resulthtml = "<b class='wrong'>您答错了！标准答案是："+bestAnswer+"</b><i onclick='showExplainnation()'>为什么选"+bestAnswer+"？</i>";
        $("#rightanswer").html(resulthtml);

        if($("#jiakao-data-cketype").val() != "jiakao.ct"){
            //取出用户的错题
            var subCoo = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#trueChapter").val();
            var ct =  storage.get("jiakao.ct", subCoo);

            //判断是否为空、是否已经存在
            if(ct == null){
                ct = $("#trueId").val();
            }else if(ct.indexOf( "=" +$("#trueId").val()) > -1){
                ct += "";
            }else{
                ct += "e" + $("#trueId").val();
            }
           
            //保存用户错题
            storage.set("jiakao.ct",subCoo,ct);
            /*cookieUtil.set("jiakao.ct", $("#jiakao-data-kemu").val()+"_" + $("#jiakao-data-gs").val()+"_0",ct);*/
            
        }
  
        if(flag){
            allfalse += 1;
            $("#FalseNum").text(allfalse);
        }
    }
    var accuracy = (alltrue/(allfalse+alltrue)).toFixed(2);
    
    $("#accuracy").text(accuracy.substring(accuracy.indexOf(".")+1)+"%");
    if(accuracy == "0.00") $("#accuracy").text('0%');
    if(accuracy == "1.00") $("#accuracy").text("100%");
}

//练习时，多选时提交答案
function tjanswer2(bestAnswer, index) {
    if($("#rightanswer").html()) { return ;}
    var myloanase = "";
    for (i = 1; i < 5; i++) {
        if ( $("#answer" + i) !=null && $("#answer" + i).attr("checked") == "checked") {
            myloanase += $("#answer" + i).val();
        }
    }
    if (myloanase == "") { alert("请选择答案！"); return; }
    if (myloanase.length < 2) { alert("多选题，请选择多项！"); return; }
    tjanswer(myloanase, bestAnswer, index);

}

//下一题，上一题，题目跳转
function go(upd){
    var index = parseInt($("#tiao").val(),10);
    var quallcount = $(".quallcount").text();
    if(upd == -1){
        if(index>1){
            getModel(index - 1);
        }else {
            alert("已经是第一题");
        }
    }else if(upd == 0){
        if(index<quallcount){
            getModel(index + 1);
        }else {
            alert("已经是最后一题");
        }
    }else{
        if (upd < 1) {
                alert("请输入大于0的数字");
                $("tiao").value = 1;
            }
            else if (upd > quallcount) {
                alert("题号必须小于总题数");
                $("#tiao").value = quallcount;
            } else {
                getModel(upd);
            }
    }
}

//产生题目总数个互不相同的随机数
var randomArray = getRandom(parseInt($("#jiakao-data-qcount").val(),10));
var randomIndex = 0;
var randomNum = 0;

//向后台请求题目详情
function getModel(index){

    randomNum = index;
    $("#rightanswer").empty();

    if(index<1){
        $("#tiao").val(1);
        $(".nowCount").text(1);
    }else if(index>$("#jiakao-data-qcount").val()){
        $("#tiao").val($("#jiakao-data-qcount").val());
        $(".nowCount").text($("#jiakao-data-qcount").val());
    }else{
        $("#tiao").val(index);
        $(".nowCount").text(index);
    }

    if($("#jiakao-data-rand").val() == "true"){
        randomNum = randomArray[randomIndex];
        randomIndex++;
    }
        $.ajax({
            type:"GET",
            url:"/ajax_sx/",
            data:{
                kemu: $("#jiakao-data-kemu").val(),
                gs: $("#jiakao-data-gs").val(),
                clevel1: parseInt($("#jiakao-data-clevel1").val(),10),
                cate: parseInt($("#jiakao-data-cate").val(),10),
                cketype: $("#jiakao-data-cketype").val(),
                index: randomNum
            },
            error:function(err){
                console.log(err);
            },
            success:function(data){ 
                itemsshow(data,index);
                if(($("#jiakao-data-cketype").val() != "jiakao.sct") && ($("#jiakao-data-cketype").val() != "jiakao.pct") && ($("#jiakao-data-cketype").val() != "jiakao.ct")){
                    storage.set(mainCookie, childCookie, index);
                }
                if($("#jiakao-data-rand").val() == "true"){
                    $("#ul_answers").append("<input type='hidden' id='random' value='"+ randomNum +"'>");
                }
                
            }
        })
    }


//向页面添加题目，选项，答案，图片，swf视频
function itemsshow(json,index){
    var __json = JSON.parse(json);
    $("timu").text("");
    $("#questionPic").html("");
    $("#ul_answers").html("");
    $("#rightanswer").html("");

    $("#timu").text(index+"、"+__json.question);
    var htmlcode = "<input type='hidden' id='trueId' value='" + __json.id + "'><input type='hidden' id='trueChapter' value='" + + __json.clevel1 + "'>";

    var bestAnswer = __json.bestAnswer;
    if(__json.type == 1){
        switch(bestAnswer){
            case 1: bestAnswer = "正确";break;
            case 2: bestAnswer = "错误";break;
        }
        htmlcode += "<li><input type='radio' id='answer1' name='answer' onclick=\"+tjanswer('正确','"+bestAnswer+"','"+index+"')\"><label for='answer1'>"+__json.answers[0]+"</label></li>";
        htmlcode += "<li><input type='radio' id='answer2' name='answer' onclick=\"+tjanswer('错误','"+bestAnswer+"','"+index+"')\"><label for='answer2'>"+__json.answers[1]+"</label></li>";

    }else if(__json.type == 2){
        switch(bestAnswer){
            case 1: bestAnswer = "A";break;
            case 2: bestAnswer = "B";break;
            case 3: bestAnswer = "C";break;
            case 4: bestAnswer = "D";break;
        }
        htmlcode += "<li><input type='radio' name='answer' id='answer1' onclick=\"tjanswer('A','"+bestAnswer+"','"+index+"');\"><label for='answer1'>A:"+__json.answers[0]+"</label></li>";
        htmlcode += "<li><input type='radio' name='answer' id='answer2' onclick=\"tjanswer('B','"+bestAnswer+"','"+index+"');\"><label for='answer2'>B:"+__json.answers[1]+"</label></li>";;
        htmlcode += "<li><input type='radio' name='answer' id='answer3' onclick=\"tjanswer('C','"+bestAnswer+"','"+index+"');\"><label for='answer3'>C:"+__json.answers[2]+"</label></li>";
        htmlcode += "<li><input type='radio' name='answer' id='answer4' onclick=\"tjanswer('D','"+bestAnswer+"','"+index+"');\"><label for='answer4'>D:"+__json.answers[3]+"</label></li>";;

    }else if(__json.type == 3){
        switch(bestAnswer){
            case 12: bestAnswer = "AB"; break;
            case 13: bestAnswer = "AC"; break;
            case 14: bestAnswer = "AD"; break;
            case 23: bestAnswer = "BC"; break;
            case 24: bestAnswer = "BD"; break;
            case 34: bestAnswer = "CD"; break;
            case 123: bestAnswer = "ABC"; break;
            case 124: bestAnswer = "ABD"; break;
            case 134: bestAnswer = "ACD"; break;
            case 234: bestAnswer = "BCD"; break;
            case 1234: bestAnswer = "ABCD"; break;
            default: break;
        }
        htmlcode += "<li><input type='checkbox' name='answer' id='answer1' value='A'><label for='answer1'>A:"+__json.answers[0]+"</label></li>";
        htmlcode += "<li><input type='checkbox' name='answer' id='answer2' value='B'><label for='answer2'>B:"+__json.answers[1]+"</label></li>";
        htmlcode += "<li><input type='checkbox' name='answer' id='answer3' value='C'><label for='answer3'>C:"+__json.answers[2]+"</label></li>";
        htmlcode += "<li><input type='checkbox' name='answer' id='answer4' value='D'><label for='answer4'>D:"+__json.answers[3]+"</label></li>";

        htmlcode += "<li><a id='multiSbmt' onclick=\"tjanswer2('" + bestAnswer + "','" + index + "')\">提交</a></li>";
    }

    $("#ul_answers").append(htmlcode);


    if(__json.swf && __json.swf != "" && __json.swfCover){
        var htmlSwf = "<img src='"+__json.swfCover+"'><div class='lookAt' id='look' ><p class='magnify'></p>查看大图</div>";

        $("#questionPic").html(htmlSwf);

        $("#questionPic img").on("click",function(){
            showbflash(__json.swf,670,260);
        });
        $("#look").on("click",function(){
            showbflash(__json.swf,670,260);
        });
    }
    else if(__json.smallImage && __json.bigImage){
        var imghtml = "<img src='"+__json.smallImage+"'><div class='lookAt' id='look' ><p class='magnify'></p>查看大图</div>";
        $("#questionPic").html(imghtml);

        $("#questionPic img").on("click",function(){
            showbigimgks(__json.bigImage);
        });
        $("#look").on("click",function(){
            showbigimgks(__json.bigImage);
        })
    }

    expnHtml = "<span>"+__json.explaination+"</span>";

    if($("#jiakao-data-cketype").val() == "jiakao.kslx"){
        var kslxHtml = "<b class='bingo'>本题答案为：" + bestAnswer + "</b><div class='kslxExpn'><span>解析：</span>" + expnHtml+ "</div>";
        $("#rightanswer").html(kslxHtml);
        for(var i=0,len=$("#ul_answers input").length;i<len;i++){
            $("#ul_answers input")[i].disabled = "disabled";
        }
        $("#expl").remove();
    }

    //收藏、取消收藏切换
    var sctt = "";
    /*if($("#jiakao-data-cketype").val() == "jiakao.sct" ){
        $("#collection").text("取消收藏");

    }else{*/
        sctt = storage.get("jiakao.sct",$("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#jiakao-data-clevel1").val());
        if(sctt != null && sctt != ""){
            if(sctt.indexOf($("#trueId").val()) > -1){
                $("#collection").text("取消收藏");
            }else{
                $("#collection").text("收藏本题");
            }
        }else{
            $("#collection").text("收藏本题");
        }
    /*}*/

    //排除、恢复切换
    /*if($("#jiakao-data-cketype").val() == "jiakao.pct"){
        $("#remove").show();
        $("#remove").text("恢复本题");
    }else*/ if($("#jiakao-data-cketype").val() == "jiakao.pct" || $("#jiakao-data-rand").val() == "true"){
        $("#remove").show();
        pctt = storage.get("jiakao.pct",$("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val() + "_" + $("#jiakao-data-clevel1").val());
        if(pctt != null && pctt != ""){
            if(pctt.indexOf($("#trueId").val()) > -1){
                $("#remove").text("恢复本题");
            }else{
                $("#remove").text("排除本题");
            }
        }else{
            $("#remove").text("排除本题");
        }
    }else{
        $("#remove").hide();
    }
    
    
    if($("#jiakao-data-cketype").val() == "jiakao.ct"){
        $("#removeCT").show();
        $("#removeCT").text("移出错题库");
    }
}

//添加本题解析
function showExplainnation(){
    ShowDialogo.show(" <div class='tanceng_tips'><h3>本题解析：</h3><p id=\"close\" onclick=\"hideshowlogindiv('append_parent')\"></p></div>",'150px','500px', '<div class="expnHtml">' +expnHtml+ '"</div>', true);
}



//get set remove cookie
var cookieUtil = {
    get:function(name,subName){
        var subC = cookieUtil.getAll(name);
        if(!subC || !subC[subName]){
            return null;
        }else {
            return subC[subName];
        }
    },
    getAll:function(name){
        var reg = new RegExp("(^| )"+ name + "=([^;]*)(;|$)");
        var cookie = document.cookie;
        var attr = cookie.match(reg);
        var result = {};
        if(!attr){
            return null;
        }else{
            var subAttr = decodeURIComponent(attr[2]);
            var subCookie = subAttr.split("&");
            for(var i=0;i<subCookie.length;i++){
                var subValue = subCookie[i].split("=");
                result[subValue[0]] = subValue[1];
            }
            return result;
        }
    },
    set:function(name,subName,value){
        var subAllc = cookieUtil.getAll(name);
        var cookieText = "";
        var exptime = new Date();
        var subParts = [];
        exptime.setTime(exptime.getTime()+3600 * 24 * 30 * 12 * 1000);
        if(!subAllc){
            if(subName == ""){
                cookieText += value;
            }else{
                cookieText += subName + "=" + value;
            }
            document.cookie = name + "="+ encodeURIComponent(cookieText) + ";expires=" + exptime.toGMTString() + ";path=/" + ";domain=.58.com" ;  
        }
        else if(!subAllc[subName]){
            for(var a in subAllc){
                subParts.push(a + "=" + subAllc[a]);
            }
            cookieText += subParts.join("&");
            cookieText += "&" + subName + "=" + value;
            document.cookie = name + "="+ encodeURIComponent(cookieText) + ";expires=" + exptime.toGMTString() + ";path=/" + ";domain=.58.com" ;  
        }else{
            subAllc[subName] = value;
            for(var a in subAllc){
                subParts.push(a + "=" + subAllc[a]);
            }
            cookieText += subParts.join("&");
            document.cookie = name + "="+ encodeURIComponent(cookieText) + ";expires=" + exptime.toGMTString() + ";path=/" + ";domain=.58.com" ;  
        }
        
    },
    removeC:function(name,subName){
        var  allchild = cookieUtil.getAll(name);
        var subParts = [];
        var exptime = new Date();
        exptime.setTime(exptime.getTime()+3600 * 24 * 30 * 12 * 1000);
        if(allchild){
            delete allchild[subName];
            for(var a in allchild){
                subParts.push(a + "=" + allchild[a]);
            }
            var  cookieT = subParts.join("&");
            if(cookieT == ""){
                var dd = new Date();
                dd.setTime(dd.getTime()-3600 * 24 * 30 * 12 * 1000);
                document.cookie = name + "=a"+ ";expires=" + dd.toGMTString()  + ";path=/" + ";domain=.58.com" ; 
            }else{
                document.cookie = name + "="+ encodeURIComponent(cookieT) + ";expires=" + exptime.toGMTString() + ";path=/" + ";domain=.58.com" ; 
            } 
            
        }
        
    }
};
var storage = cookieUtil;

//产生n个互不相同的随机数，保存到return_array
function getRandom(n){
    var temp_arry = new Array();
    for(var i=1;i<n+1;i++){
        temp_arry.push(i);
    }
    var return_array = new Array();
    for(var j=0;j<n;j++){
        var index = Math.floor(Math.random()*temp_arry.length);
        return_array[j] = temp_arry[index];
        temp_arry.splice(index,1);
    }
    return return_array;
}

//判断字符串是否在数组中
function InArray(str,array){
    for(var i=0;i<array.length;i++){
        if(array[i] == str){
            return true;
        }
    }
    return false;
}


var sc_pc_rm = {
    store:function(ele,mainCook,subCook,string){
       //取出用户的收藏题、或者排除题、或者错题
            var sct = storage.get(mainCook, subCook);
            if (sct == null) {
                sct = $("#trueId").val();
            }else {
                sct += "e" + $("#trueId").val();
            }
            //保存用户收藏的题或者排除题、或者错题
            storage.set(mainCook, subCook, sct);
            $(ele).text(string); 
            
    },
    removeCk:function(ele,mainCook,subCook,string){
        var __sct = storage.get(mainCook,subCook);
            if(__sct != null || __sct != ""){
                var __ind = jQuery.inArray($("#trueId").val(), __sct.split("e"));
                if(__ind > -1){
                    var  sctArr = __sct.split("e");
                    sctArr.splice(__ind,1);
                    if(sctArr.length<1){
                        storage.removeC(mainCook, subCook);
                    }else{
                        storage.set(mainCook, subCook,sctArr.join("e"));
                    }
                    $(ele).text(string);                    
                }
            }
        
    }

}