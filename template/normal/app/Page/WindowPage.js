rd2.page("window").before(function(obj){

	$("#page_title").text("Window Test");

	obj.pageObj.find("#window_none").on("click",function(){

		rd2.window.none({
			text:"Loading..",
			callback:function(obj){
				setTimeout(function(){
					obj.close();
				},3000);
			}
		});

	});

	obj.pageObj.find("#window_open").on("click",function(){

		rd2.window.open({
			text:"ローディング中..",
			callback:function(obj){
				setTimeout(function(){
					obj.close();
				},3000);
			},
		});

	});
	
	obj.pageObj.find("#window_alert").on("click",function(){

		rd2.window.alert({
			title:"アラートウィンドウのテスト",
			text:"テキストサンプルテキストサンプルテキストサンプルテキストサンプル",
			callback:function(obj){
				obj.close();
			},
		});

	});

	obj.pageObj.find("#window_confirm").on("click",function(){
		rd2.window.confirm({
			title:"確認ダイアログのテスト",
			text:"テキストサンプルテキストサンプルテキストサンプルテキストサンプル",
			callback:{
				ok:function(obj){
					console.log("OK");
					obj.close();
				},
				cancel:function(obj){
					console.log("NG");
					obj.close();
				},
			}
		});
	});

	obj.pageObj.find("#window_confirm_custom").on("click",function(){
		rd2.window.confirm({
			class:"custom",
			title:"確認ダイアログのテスト",
			text:"テキストサンプルテキストサンプルテキストサンプルテキストサンプル",
			callback:{
				ok:function(obj){
					console.log("OK");
					obj.close();
				},
				cancel:function(obj){
					console.log("NG");
					obj.close();
				},
			}
		});
	});

	obj.pageObj.find("#window_image").on("click",function(){
		rd2.window.image({
			image:"assets/images/cat.jpg",
			callback:function(obj){
				obj.close();
			},
		});

	});

	obj.pageObj.find("#window_notification").on("click",function(){
		rd2.window.notification({
			text:"メッセージ通知テキストテキストテキストテキスト",
			callback:function(obj){
				obj.close();
			},
		});

	});

	obj.pageObj.find("#window_notification_custom").on("click",function(){

		rd2.window.notification({
			class:"success",
			text:"成功通知用テキストテキストテキストテキストテキスト",
			callback:function(obj){
				obj.close();
			},
		});
		
	});

});