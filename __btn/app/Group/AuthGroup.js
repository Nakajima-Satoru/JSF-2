var auth=null;

rd2.group("auth").before(function(obj){

	if(obj.mode=="back"){
		return;
	}

	var page=obj.page;

	if(auth){
		$("header").removeClass("hide");
	}
	else{

		$("header").addClass("hide");
		
		if(
			page=="login" ||
			page=="user_regist" ||
			page=="user_regist_form" || 
			page=="user_regist_form2" ||
			page=="user_regist_complete"			
		){
			return;
		}

		obj.wait();
		obj.move("login",{
			animation:"slide-top",
			cacheClear:true,
		});	

	}

});