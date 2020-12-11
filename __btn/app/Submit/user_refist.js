rd2.form("user_regist").callSubmit(function(data){

	var vres=rd2.validate("user_regist").verify(data);

	if(vres){ return; }

	// 入力データを保存
	rd2.keep("user_regist").set(data);

	rd2.redirect.move("user_regist_form2");

});