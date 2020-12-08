rd2.form("login").callSubmit(function(data){

	var vres=rd2.validate("login").verify(data);

	rd2.validate("login").outputError(vres);

	if(vres){
		return;
	}

	if(data.username!="admin" || data.password!="12345"){
		rd2.validate("login").outputError({
			username:"入力いただいたアカウントは存在しないか、権限がないためログインできません。",
		});
		return;
	}

	$(".loading").addClass("open");
	
	setTimeout(function(){
		
		$(".loading").removeClass("open");

		logined=true;0
		rd2.redirect.move("top",{
			animation:"slide-top",
		}).resetRedirectCache();
	
	},2000);


});