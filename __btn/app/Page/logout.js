rd2.page("logout").addGroup(["auth"]).before(function(obj){

	auth=null;

	obj.wait();
	obj.move("login",{
		animation:"slide-top",
		cacheClear:true,
	});

});