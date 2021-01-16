rd2.page("page3").addGroup("app").before(function(obj){

	if(obj.mode=="back"){
		return;
	}

	rd2.redirect.disable(true);
	
	var dialog=rd2.dialog("dialog_loading").addClass("max-width").open();

	setTimeout(function(){
		rd2.redirect.disable(false);
		dialog.close();
		obj.move("top");
	},4000);

});