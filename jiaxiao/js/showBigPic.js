/*
    @autor:caixiaoqing  caixiaoqing@58.com
    @date:2015/08/03
    @descreption 驾校一点通模拟考试的试题页
    
    function showBigImgORswf(_src)   //判断是视频还是图片
    主要功能是查看放大的图片弹层
*/


function showBigImgORswf(_src){
    if(_src.indexOf("swf") > 0){
        showbflash(_src,620,250);
    }else{
        showbigimgks(_src);
    }
}


//查看试题大图 开始
function showbigimgks(_src) {
    hideshowlogindiv('append_parent');//检查是否已经存在弹出层
    //显示 加载中...  的小弹框
	ShowDialogo.show('', '40px', '100px', '<div style="width:100px;height:40px;text-align:center;line-height:40px;">loading...</div>', true);
	//加载图片，并且设置弹出层在页面中的位置
    JsGetImageSize(_src, imgcallbakc);
}

function JsGetImageSize(sUrl, fCallback) {
    var img = new Image();
    //(! -[1, ])判断是IE9以下版本
    if (! -[1, ]) {
        sUrl = sUrl + '?t=' + Math.random(); //IE下，ajax会缓存，导致onreadystatechange函数没有被触发，所以需要加一个随机数
        img.src = sUrl;
        img.onreadystatechange = function() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                fCallback({ width: img.width, height: img.height, url: sUrl });
            }
        };
    }
    else {
        img.src = sUrl;
        img.onload = function() {
            fCallback({ width: img.width, height: img.height, url: sUrl });
        };
    }
}

function imgcallbakc(j) {
    
    //清除loading...的弹层
    hideshowlogindiv('append_parent');
    //加载图片弹层 
    ShowDialogo.show(" <div style='overflow:hidden;position:relative;height:35px'><p id=\"close\" onclick=\"hideshowlogindiv('append_parent')\"></p></div>", (j.height +30) + 'px','650px', '<div class="tanceng"><img src="' + j.url + '"/></div>', true);

    //点击除弹层之外的区域，remove弹层
    document.onclick = function(evt) {
        var evt = window.event ? window.event : evt, 
            target = evt.srcElement || evt.target;
        var _ishidden = true;
        while (target.nodeName.toLowerCase() != "html") {
            target = target.parentNode;
            if (typeof (target.id!='undefined') && target.id == "append_parent") {
                _ishidden = false;
                break;
            }
        }
        if (_ishidden) {
            hideshowlogindiv('append_parent');//
            document.onclick = function() { };
        }
    }
}

// 查看试题大图片 结束


//查看swf小视频
function showbflash(flashurl,w,h) {
    var __swfurl = "<object wmode='transparent' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' width='"+w+"' height='"+h+"'><param name='allowScriptAccess' value='sameDomain'><param name='movie' value='"+flashurl+"'><param name='quality' value='high'><param name='wmode' value='transparent'><param name='bgcolor' value='#ffffff'><embed src='"+flashurl+"' quality='high' bgcolor='#ffffff' width='"+w+"' height='"+h+"' style='margin-left:15px' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>";
    ShowDialogo.show(" <div style='overflow:hidden;position:relative;height:35px'><p id=\"close\" onclick=\"hideshowlogindiv('append_parent')\"></p></div>", "300px", "650px", "<div >"+__swfurl+"</div>", true);
}



//查看本题详解
function explaination(){
    var expnHtml = "<p></p>"
}

//关闭弹层
function hideshowlogindiv(id) {
    var obj1 = document.getElementById(id);
    if (obj1) obj1.parentNode.removeChild(obj1);
    var obj = document.getElementById("fathershowlogindiv");
    if (obj) obj.parentNode.removeChild(obj);
}