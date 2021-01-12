rd2.page("top").addGroup(["app"]).before(function(obj){

	obj.pageObj.find("#open_none").on("click",function(){

		// window none
		rd2.window.none({
			title:"Prease Wait....",
			callback:function(obj){

				setTimeout(function(){
					obj.close();
				},2000);

			},
		});

	});

	obj.pageObj.find("#open").on("click",function(){

		// window open
		rd2.window.open({
			title:"Prease Wait....",
			callback:function(obj){

				setTimeout(function(){
					obj.close();
				},2000);

			},
		})

	});

	obj.pageObj.find("#open_alert").on("click",function(){
		
		// window alert
		rd2.window.alert({
			title:"Alert Title",
			text:"Text Sample Text text text....",
			callback:function(obj){
				obj.close();
			},
		});

	});

	obj.pageObj.find("#open_confirm").on("click",function(){

		// window confirm
		rd2.window.confirm({
			title:"Confirm Title",
			text:"Text Sample Text text text....",
			callback:{
				ok:function(obj){
					obj.close();
					console.log("OK");
				},
				cancel:function(obj){
					obj.close();
					console.log("Cancel");
				},
			},
		});

	});

	obj.pageObj.find("#open_input").on("click",function(){

		// window input text
		rd2.window.textInput({
			title:"Input Form Title",
			text:"Prease Password input...",
			callback:{
				ok:function(obj){
					obj.close();
					console.log(obj.input);
				},
				cancel:function(obj){
					obj.close();
				},
			},
		});

	});

	obj.pageObj.find("#notification").on("click",function(){

		// notification
		rd2.window.notification({
			title:"Notification Title...",
			text:"text sample text text text text..",
			callback:function(obj){
				obj.close();	
			},
		});

	});

	obj.pageObj.find("#window").on("click",function(){

		rd2.window.dialog({
			title:"Window Dialog",
			dialogView:"dialogWindow",
		});

	});

});