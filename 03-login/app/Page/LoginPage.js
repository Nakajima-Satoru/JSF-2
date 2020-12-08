rd2.page("login").addGroup(["login"]).before(function(obj){

	rd2.form("login").set({
		username:{
			type:"text",
			placeholder:"username..",
		},
		password:{
			type:"password",
		},
		submit:{
			type:"submit",
			value:"Login",
			class:"btn btn-primary",
		},
	});

});