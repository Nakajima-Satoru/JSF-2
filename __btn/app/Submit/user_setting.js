rd2.form("user_setting").callSubmit(function(data){

	var vres=rd2.validate("user_setting").verify(data);

	if(vres){ return; }

	rd2.window.notification({
		text:"ユーザー設定を更新しました",
		button:"閉じる",
	});

});