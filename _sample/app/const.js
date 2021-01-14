function setTitle(text){
	$("#page_title").text(text);
}

var loading={
	open:function(){
		$(".loading").addClass("open");
	},
	close:function(){
		$(".loading").removeClass("open");
	},
};
