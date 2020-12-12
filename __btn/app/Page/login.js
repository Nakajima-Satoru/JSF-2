rd2.page("login").addGroup(["auth"]).before(function(obj){

	rd2.form("login").set({
		username:{
			type:"text",
			placeholder:"ユーザーIDまたは登録メールアドレスを入力",
		},
		password:{
			type:"password",
		},
		submit:{
			type:"submit",
			value:"ログイン",
			class:"btn btn-info",
		},
	});

});