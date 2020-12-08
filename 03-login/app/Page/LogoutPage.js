rd2.page("logout").addGroup(["app"]).before(function(obj){

	logined=null;
	obj.move("login",{
		animation:"slide-top",
	}).resetRedirectCache();

});