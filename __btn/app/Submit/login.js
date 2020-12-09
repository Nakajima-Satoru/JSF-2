rd2.form("login").callSubmit(function(data){

	// validate
	var vres=rd2.validate("login").verify(data);

	if(vres){
		return;
	}

	// set auth data
	auth={
		accessToken:"***************************",
		username:"user01",
		name:"テスト名テキストテキスト",
		email:"xxxxxx@email.co.jp",
	};

	// redirect top page
	rd2.redirect.move("top",{
		animation:"slide-top",
		cacheClear:true,
	});

});