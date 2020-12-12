rd2.page("user_regist_complete").addGroup(["auth"]).before(function(obj){

	obj.pageObj.find("#top").on("click",function(){

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

});