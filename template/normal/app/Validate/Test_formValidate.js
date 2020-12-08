rd2.validate("test_form").set({
	name:[
		{
			rule:"required",
			message:"名前が未入力です",
		},
	],
	code:[
		{
			rule:"required",
			message:"コードが未入力です",
		},
		{
			rule:["alphaNumeric","-=_.,@"],
			message:"半角英数字のみで入力してください",
		},
		{
			rule:["maxLength",4],
			message:"4文字以内で入力してください",
		},
	],
	email:[
		{
			rule:"required",
			message:"メールアドレスが未入力です",
		},
		{
			rule:"isEmail",
			message:"メールフォーマットが不正です",
	
		},
	],
	message:[
		{
			rule:"required",
			message:"メッセージが未入力です",
		},
	],
	category:[
		{
			rule:"required",
			message:"カテゴリーが未選択です",
		},
	],
	radio:[
		{
			rule:"required",
			message:"ラジオボタンが未選択です",
		},
	],
	checkbox:[
		{
			rule:"required",
			message:"チェックボックスが未選択です",
		},
		{
			rule:["betweenSelectedCount",2,5],
			message:"2個以上5個以下で選択して下さい",
		}
	],
});