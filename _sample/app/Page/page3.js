rd2.page("page3").addGroup(["app"]).before(function(obj){

	loading.open();

	if(obj.mode=="back"){
		return;
	}

	rd2.redirect.disable(true);

	setTimeout(function(){
		rd2.redirect.disable(false);
		obj.move("top");
		loading.close();
	},3000);

});