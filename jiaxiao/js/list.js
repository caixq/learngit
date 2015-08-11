$(function(){
	$(".tab ul").on("click",'a',function(){
		var  $this = $(this);
		$this.siblings().removeClass('on');
		$this.addClass('on');
		var data_type = $this.attr("data-type");
		var list = $(".right").find("[data-type = '" + data_type + "']");
		list.siblings().hide();
		list.show();
	})


})
