rd2.page("page3").addGroup(["app"]).before(function(obj){

	rd2.redirect.disable(true);

	if(obj.mode=="back"){
		return;
	}

	var dialog=rd2.dialog("dialog_loading").addClass("wide-width").open();

	setTimeout(function(){	
		rd2.redirect.disable(false);
		dialog.close();
		obj.move("top");
	},3000);

});