rd2.validate("form2").set({
	value1:[
		{
			rule:"required",
			message:"未入力です",	
		}
	],
	value2:[
		{
			rule:["requiredIf","value2_0","aaa"],
			message:"上に「aaa」が入力されている場合は必須です",
		}
	],
	value3:[
		{
			rule:["requiredWith",["value3_0","value3_1"]],
			message:"上の値が両方とも入力されている場合は必須です",
		}
	],
	value4:[
		{
			rule:["requiredWithOr",["value4_0","value4_1"]],
			message:"上の値のどちらかが入力されている場合は必須です",
		}
	],
	value5:[
		{
			rule:["confirmed","value5_0"],
			message:"上の値と同じ値を入力してください",
		}
	],
	value6:[
		{
			rule:"alphaNumeric",
			message:"半角英数字のみを入力してください",
		}
	],
	value7:[
		{
			rule:["alphaNumeric",".,=+-_"],
			message:"半角英数字と利用可能な特殊文字「. , = + - _」のみを入力してください",
		}
	],
	value8:[
		{
			rule:"numeric",
			message:"半角数字のみを入力してください",
		}
	],
	value9:[
		{
			rule:["numeric","-"],
			message:"半角数字と利用可能な特殊文字「-」のみを入力してください",
		}
	],
	value10:[
		{
			rule:["length",6],
			message:"6文字で入力してください",
		},
	],
	value11:[
		{
			rule:["minLength",4],
			message:"4文字以上で入力してください",
		},
	],
	value12:[
		{
			rule:["maxLength",10],
			message:"10文字以内で入力してください",
		},
	],
	value13:[
		{
			rule:["betweenLength",4,10],
			message:"4～10文字の範囲で入力してください",
		},
	],
	value14:[
		{
			rule:["value",10],
			message:"整数値10を入力してください",
		},
	],
	value15:[
		{
			rule:["minValue",4],
			message:"整数値4以上を入力してください",
		},
	],
	value16:[
		{
			rule:["maxValue",10],
			message:"整数値10以下を入力してください",
		},
	],
	value17:[
		{
			rule:["betweenValue",4,10],
			message:"整数値4～10の範囲で入力してください",
		},
	],
/*
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
*/
});