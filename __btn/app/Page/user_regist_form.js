rd2.page("user_regist_form").addGroup(["auth"]).before(function(obj){

	rd2.form("user_regist").set({
		email:{
			type:"text",
		},
		username:{
			type:"text",
		},
		password:{
			type:"password",
		},
		submit:{
			type:"submit",
			value:"次へ",
			class:"btn _right",
		},
	});

});