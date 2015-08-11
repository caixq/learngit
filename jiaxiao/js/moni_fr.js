
/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03
    @descreption 驾校一点通模拟考试的试题页
    function changeBestAns(bestAnswer,t_type)    //将正确答案 变成标准形式
    function tjAnawer(_this,_answer) //模拟考试，用户答题之后立即判断对错，并对用户选择和正确与否进行保存
    function tjAnawer2(_this)  //模拟考试多选判断对错
    function rollUp(_this) //用户做完一题后，自动滚动到下一题
    function isInObject(obj,subname)  //判断对象中是否有某个属性
*/

var parent = window.top; 

//用户通过分页进入页面时，判断是否已经做过本页题目
parent.window.scrollTo(0,185);

//翻页时回填数据
(function(){
    for(var i =0,len=$(".item").length;i<len;i++){ //循环所有题目
        var _item =$($(".item")[i]);
        var _ind = _item.attr("index");//获得题目序号
        var bestANS = $(_item).attr("bestanswer");//获得本题的答案
        var t_type = $(_item).attr("ttype");//获得本题的类型（3种判断、单选、多选）

        $("#trueAns"+_ind).text(changeBestAns(bestANS,t_type));//回填正确 答案
        if(isInObject(parent.yonghu_choice,"key"+_ind)){ //验证yonghu_choice中是否有值
            for(var j=0;j<_item.find("input").length;j++){  //循环本题的所有input
                var _input = _item.find("input")[j];
                var _value = $(_input).attr("answer");
                $("#yourAns"+_ind).text(parent.yonghu_choice["key"+_ind]);//回填用户选择
                if(parent.yonghu_choice["key"+_ind].indexOf(_value) > -1){
                    $(_input).attr("checked","checked");//翻页时如果用户选择了该input则选中
                    //如果用户选择 == 正确答案（打对勾）
                    if(parent.yonghu_choice["key"+_ind] == changeBestAns(bestANS,t_type)){
                        $("#TorF"+_ind).removeClass("false");
                        $("#TorF"+_ind).addClass("_true");
                    }else{
                        $("#TorF"+_ind).removeClass("_true");
                        $("#TorF"+_ind).addClass("false");
                    }
                }    
            }
        }
      
    }
    //如果是提交答案后翻页，则全部表单失效
    if(isInObject(parent.yonghu_choice,"finished") && parent.yonghu_choice["finished"] == 1){
        $(".item .result").show();
        for(var ll=0;ll<$("input").length;ll++){
            $("input")[ll].disabled = "disabled";
        }
    }
})();


//将正确答案 变成标准形式
function changeBestAns(bestAnswer,t_type){
    if(t_type == "1"){
        switch(bestAnswer){
            case "1":  bestAnswer = "正确";break;
            case "2":  bestAnswer = "错误";break;
        }
    }else if(t_type == "2"){
        switch(bestAnswer){
            case "1":  bestAnswer = "A";break;
            case "2":  bestAnswer = "B";break;
            case "3":  bestAnswer = "C";break;
            case "4":  bestAnswer = "D";break;
        }
    }else if(t_type == "3"){
        switch(bestAnswer){
            case "12": bestAnswer = "AB"; break;
            case "13": bestAnswer = "AC"; break;
            case "14": bestAnswer = "AD"; break;
            case "23": bestAnswer = "BC"; break;
            case "24": bestAnswer = "BD"; break;
            case "34": bestAnswer = "CD"; break;
            case "123": bestAnswer = "ABC"; break;
            case "124": bestAnswer = "ABD"; break;
            case "134": bestAnswer = "ACD"; break;
            case "234": bestAnswer = "BCD"; break;
            case "1234": bestAnswer = "ABCD"; break;
            default: break;
        }
        
    }
    return bestAnswer;
}

//用户答题之后立即判断对错，并对用户选择和正确与否进行保存
function tjAnawer(_this,_answer){
    var __parent = $(_this).parents('.item');
    var answer = "";
    if(arguments.length > 1){
        answer = _answer;
    }else{
        answer=$(_this).attr('answer');
    }
    var bestAnswer=__parent.attr('bestAnswer');
    var examIndex=__parent.attr('index');
    var t_type=__parent.attr('ttype');
    parent.$("#examIndex"+examIndex).addClass("already");
    for(var i=0;i<parent.$("td").length;i++){
        $(parent.$("td")[i]).removeClass("ing");
    }
    parent.$("#examIndex"+examIndex).addClass("ing");

    var answer = answer,bestAnswer = changeBestAns(bestAnswer,t_type);
    var Tchoice = 0;
    
    parent.yonghu_choice["key"+examIndex] = answer;

    $("#yourAns"+examIndex).text(answer);
        $("#trueAns"+examIndex).text(bestAnswer);
        if(answer == bestAnswer){
            $("#TorF"+examIndex).removeClass("false");
            $("#TorF"+examIndex).addClass("_true");
            parent.yonghu_choice["TorF"+examIndex] = 1;
        }else{
            $("#TorF"+examIndex).removeClass("_true");
            $("#TorF"+examIndex).addClass("false");
            parent.yonghu_choice["TorF"+examIndex] = 0;
        }
    rollUp(__parent.next());
}

//多选判断对错
function tjAnawer2(_this){
    var part = $(_this).parents('.item');
    var answer = "";
    for(var tt=0,lenIn = part.find("input");tt < lenIn.length;tt++){
        if(lenIn[tt] != null && lenIn[tt].checked){
            answer += $(lenIn[tt]).attr("answer");
        }
    }

    if (answer == "") { alert("请选择答案！"); return; }
    if (answer.length < 2) { alert("多选题，请选择多项！"); return; }

    var bestAnswer = part.attr('bestAnswer');
    var examIndex = part.attr('index');
    var t_type = part.attr('ttype');

    tjAnawer(_this,answer);
}

//用户做完一题后，自动滚动到下一题
function rollUp(_this){
    var oldHeight = _this.offset().top;
    var  _height =0;
    var ifroffH = parent.$("#mainfrm").offset().top;
    var oldLeft = parent.document.body.scrollTop;
    parent.window.scrollTo(oldLeft,ifroffH+oldHeight+_height);
}


function isInObject(obj,subname){
    for(var o in obj){
        if(o == subname){
            return true;
        }
    }
    return false;
}



