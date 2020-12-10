rd2.page("user_setting").addGroup(["auth"]).before(function(obj){

	setTitle("ユーザー設定");

	rd2.form("user_setting").set({
		email:{
			type:"text",
		},
		username:{
			type:"text",
		},
		password_1:{
			type:"password",
		},
		password_2:{
			type:"password",
		},
		submit:{
			type:"submit",
			value:"設定を変更する",
			class:"btn btn-success",
		},
	});

});