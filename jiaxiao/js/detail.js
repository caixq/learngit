$(function () {

	//查看大图
	$("#look").on("click",function(){
		$(".cover").css("height",$(window).height()+"px");
		$(".tanceng").show();
	});
	$("#close").on("click",function(){
		$(".tanceng").hide();
	});

	//判断用户的答案是否正确
});
