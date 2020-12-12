rd2.form("user_regist2").callSubmit(function(data){

	var vres=rd2.validate("user_regist2").verify(data);

	if(vres){ return; }

	// 入力データをクリア
	rd2.keep("user_regist").delete();

	rd2.redirect.move("user_regist_complete");

});