var setTitle=function(title){
	$("header #page_title").text(title);
};

var sidebar=false;
$("html").on("click","header .barger_btn",function(){

	if(sidebar){
		$(".sidebar").removeClass("active");
		sidebar=false;
	}
	else{
		$(".sidebar").addClass("active");
		sidebar=true;
	}

});

$("html").on("click",".sidebar .bg",function(){
	$(".sidebar").removeClass("active");
	sidebar=false;
});

$("html").on("click",".sidebar .menu a[url]",function(){
	$(".sidebar").removeClass("active");
	sidebar=false;
});