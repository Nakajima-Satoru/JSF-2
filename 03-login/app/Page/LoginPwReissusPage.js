rd2.page("loginpwreissus").before(function(obj){

	rd2.form("loginpwreissus").set({
		email:{
			type:"text",
			placeholder:"Emailを入力",
		},
		submit:{
			type:"submit",
			value:"再発行手続き開始",
			class:"btn btn-primary",
		},
	});

});
