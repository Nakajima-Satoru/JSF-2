rd2.page("user_regist_form").addGroup(["auth"]).before(function(obj){
	
	// Form Tag Set
	rd2.form("user_regist").set({
		email:{
			type:"text",
		},
		username:{
			type:"text",
		},
		nickname:{
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
			value:"次へ",
			class:"btn _right",
		},
	});

	// 入力データのセット
	var data=rd2.keep("user_regist").get();
	if(data){
		rd2.form("user_regist").setData(data);
	}

});