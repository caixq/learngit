$(function(){
	//按回车键触发提交
	$(document).on("keyup",function(e){
		if(e.which == 13){
			$('#seachForm').submit();
		}
	});

	//导航tab切换
	var carConf = {
		'car':{
			'kemu_1':'小车类（C1/C2照）科目一',
			'kemu_4':'小车类（C1/C2照）科目四',
			'gx_1':'/jiakao/ckmy/',
			'gx_4':'/jiakao/ckms/'
		},
		'truck':{
			'kemu_1':'大车类（A2/B2照）科目一',
			'kemu_4':'大车类（A2/B2照）科目四',
			'gx_1':'/jiakao/bkmy/',
			'gx_4':'/jiakao/bkms/'
		},
		'bus':{
			'kemu_1':'客车类（A1/A3/B1照）科目一',
			'kemu_4':'客车类（A1/A3/B1照）科目四',
			'gx_1':'/jiakao/akmy/',
			'gx_4':'/jiakao/akms/'
		},
		'motor':{
			'kemu_1':'摩托类（D/E/F照）科目一',
			'kemu_4':'摩托类（D/E/F照）科目四',
			'gx_1':'/jiakao/ekmy/',
			'gx_4':'/jiakao/ekms/'
		}
	};
	
	$(".nav").on("click","li",function(e){
		var $this = $(this);
		$this.addClass("now").siblings().removeClass("now");
		var type = $this.attr("data-type");
      	$("#kemu_1").text(carConf[type]['kemu_1']);
      	$("#kemu_4").text(carConf[type]['kemu_4']);
      	$("#gx_1").attr("href",carConf[type]['gx_1']);
      	$("#gx_4").attr("href",carConf[type]['gx_4']);
	})
	

});
