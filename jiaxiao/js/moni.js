
/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03
    @descreption 

    function finishedExam()    //在答题时间内做完交卷,检查是否做完，是否提交过，input失效，计算分数，显示结果，存储 cookie
    function checkFinish()  检查是否做完   
    function autoSize()  自适应调整iframe的大小  
    function tableMove()  题目table随滚动自适应位置，绕开头部和footer
*/
var yonghu_choice = {};
var Dtimer = null;
var iframe = document.getElementById('mainfrm');
var subwin = iframe.contentWindow.window;
var finished = true;
var subCoo = $("#jiakao-data-kemu").val() + "_" + $("#jiakao-data-gs").val();
var count = $("#jiakao-data-totalqn").val();

$(function(){
    
    //45分钟倒计时
    var nowSecds = 45*60;
        Dtimer = setInterval(function(){
            if(nowSecds>0){
                nowSecds--;
                var trueH = Math.floor(nowSecds/60);
                var trueS = nowSecds%60;
                if(trueS<10) trueS = "0"+trueS;
                if(trueH<10) trueH = "0"+trueH;
                $("#leftTime").text(trueH + ":" + trueS);
            }else{
                clearInterval(Dtimer);
                alert("时间到！");
                finished = false;
                finishedExam();
            }
        },1000);

    //动态设置iframe的高度
    window.setInterval("autoSize()", 200); 

    //设置右半栏table的高度随滚动改变
    setInterval("tableMove()",25);

    $(".subtest").on("click",function(e){
        finishedExam();
    });

    $(".reset").on("click",function(){
        window.location.href=window.location.href;
    });

    $("table").on("click","td",function(e){
        var examIndex = $(this).attr("id").replace("examIndex","");
        var tmIndex = subwin.$("[index='"+examIndex+"']");
        if(tmIndex.length>0){
            subwin.rollUp(tmIndex);
        }else{
            alert("本页没有该题，请向上或向下翻页");
        }
        
    });

    $("#history").on("click",function(){
        subwin.historyScore();
    })


});

//在答题时间内做完交卷
function finishedExam(){
    
    if(finished && !checkFinish()) return;//如果正常提交试卷，则检查题目是否做完    
    clearInterval(Dtimer);//清除倒计时    
    if(subwin.$(".item .result").is(':visible')){ //检查是否已经提交过
        return;
    }
    var trueNums = 0;
    var falseNums = 0;
    for(var o=0;o<subwin.$("input").length;o++){
        subwin.$("input")[o].disabled = "disabled"; //input失效
    }
    subwin.$(".result").show();//显示答题结果
    yonghu_choice["finished"] = 1;
                                        //计算分数
    for(var jj in yonghu_choice){
        if(jj.indexOf("TorF")>-1){
            if(yonghu_choice[jj] == 1){
                trueNums++;;
            }else{
                var indd = jj.replace(/TorF/,"");
                $("#examIndex"+indd).addClass("__wrong");
                falseNums++;
            }
        }
    }

    //显示分数
    if(count == 100){
        $(".score i").text(trueNums);
    }else if(count == 50){
        trueNums = trueNums*2;
        $(".score i").text(trueNums);
    }
    $(".finally").show();

    var leftTime = $("#leftTime").text();//计算并显示剩余时间
    var timeArr = leftTime.split(":");
    var min = 44 - parseInt(timeArr[0],10);
    var sec = 60 - parseInt(timeArr[1],10);
    if(min == 44 && sec == 60){
        min = 45; 
        sec = 00;
    }
    $("._time i").text(min + " 分 " + sec + " 秒");

    var score =  subwin.storage.get("moniExam", subCoo);
        //判断是否为空、是否已经存在
        if(score == null){
            score = trueNums;
        }else{
            var scoreArray = score.split("e");
            if(scoreArray.length >= 10){
                scoreArray.shift();
                score = scoreArray.join("e");
            }
            score += "e" + trueNums;
        }   
        //保存用户的答题成绩
        subwin.storage.set("moniExam",subCoo,score);
    
    subwin.location.href = subwin.$("#jiakao-data-handin").val();

}


function checkFinish(){
    for(var ii=1;ii<=count;ii++){
        if(yonghu_choice["key"+ii] == "" || !yonghu_choice["key"+ii]){
            alert("您还有题目没有做完");
            subwin.rollUp($(subwin.$(".item")[ii-1]));
            return false;
        }
    }
    return true;
}

function autoSize(){
        var _height = subwin.$(".left").height()+30;
        iframe.style.height = _height +"px";
    }



function tableMove(){
    var initpos = $(".right")[0].offsetTop;
    var initHeight = $(".right").height();
    var maxPos = $(".otherlinks")[0].offsetTop;
    var scrollT = 0;
    var _top = 0;
    scrollT = Math.max(parseInt(document.body.scrollTop),parseInt(document.documentElement.scrollTop));
    if(scrollT<185){
        _top = 185-scrollT;
        $(".right").css({
                "position":"fixed",
                "top":_top+"px",
                "right":"150px"
            });
    }else if((maxPos-initHeight) > scrollT){
            $(".right").css({
                "position":"fixed",
                "top":0,
                "right":"150px"
            });  
    }else{
        $(".right").css({
            "position":"absolute",
            "top":"185px",
            "right":"150px"
        });
    }

}





