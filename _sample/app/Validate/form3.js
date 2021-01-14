rd2.validate("form3").set({
	value1:[
		{
			rule:["selectedCount",3],
			message:"3個は必ず選択してください",
		},
	],
	value2:[
		{
			rule:["minSelectedCount",3],
			message:"3個以上を選択してください",
		},
	],
	value3:[
		{
			rule:["maxSelectedCount",10],
			message:"10個以内で選択してください",
		},
	],
	value4:[
		{
			rule:["betweenSelectedCount",3,10],
			message:"3～0個の範囲で選択してください",
		},
	],
	value5:[
		{
			rule:["like","だべ"],
			message:"「だべ」が入っているテキストを入力してください",
		},
	],
});