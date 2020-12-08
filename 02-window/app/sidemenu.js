
$("html").on("click","header .sidemenubarger",function(){

	$(".sidemenu").addClass("open");
	
});
$("html").on("click",".sidemenu a",function(){

	$(".sidemenu").removeClass("open");

});