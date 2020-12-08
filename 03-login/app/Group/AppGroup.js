var logined=null;

rd2.group("app").before(function(obj){
	
	$("#page_title").text("Application...");

	// login check.
	if(!logined){
		obj.wait();
		setTimeout(function(){
			obj.move("login",{
				animation:"slide-top",
			});
		},500);
	}
	else{
		$("header").removeClass("hide");
	}


});

rd2.group("login").before(function(obj){

	// login check.
	if(logined){
		obj.wait();
		setTimeout(function(){
			obj.move("top");
		},500);
	}
	else{
		$("header").addClass("hide");
	}

});
