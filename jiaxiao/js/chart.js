/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03
    @descreption 驾校一点通模拟考试的历史成绩 折线图

*/

function historyScore(){

    var parent = window.top; 
    var subCoo = parent.$("#jiakao-data-kemu").val() + "_" + parent.$("#jiakao-data-gs").val();
    var score = cookieUtil.get("moniExam", subCoo);
    if(score == null || score == ""){
        alert("您还没有历史记录！");
        return;
    }
    var scoreArray = score.split("e");
    var categories = new Array(scoreArray.length);
    for(var i=0;i<scoreArray.length;i++){
        categories[i] = i+1;
        scoreArray[i] = parseInt(scoreArray[i],10);
    }

    var ShowDialogo = new ShowDialog(); //设置对象名,供内部引用 
    ShowDialogo.msgobjname = "ShowDialogo";

    ShowDialogo.show(" <div style='overflow:hidden;position:relative;'><h3 class='chartTitle'>最近10次成绩</h3><p id=\"close\" onclick=\"hideshowlogindiv('append_parent')\"></p></div>", 300 + 'px','650px', '<div class="tanceng" id="chart"></div>', true);

    $('#chart').highcharts({
        chart:{
            height:300
        },
        title: {
            text: '历史成绩',
            x: -20 //center
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: '历史成绩(分)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: 'red'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '成绩',
            data: scoreArray
        }]
    });

}
