rd2.page("validate_test_form").addGroup("app").before(function(obj){

	rd2.form("vtest").set({
		required:{
			type:"text",
		},
		alpha_numeric:{
			type:"text",
		},
		numeric:{
			type:"text",
		},
		length:{
			type:"text",
		},
		max_length:{
			type:"text",
		},
		min_length:{
			type:"text",
		},
		between_length:{
			type:"text",
		},
		value:{
			type:"text",
		},
		min_value:{
			type:"text",
		},
		max_value:{
			type:"text",
		},
		between_value:{
			type:"text",
		},
		selected_count:{
			type:"checkbox",
			select:{
				0:"Checkbox A",
				1:"Checkbox B",
				2:"Checkbox C",
				3:"Checkbox D",
				4:"Checkbox E",
				5:"Checkbox F",
				6:"Checkbox G",
				7:"Checkbox H",
				8:"Checkbox I",
			},
		},
		min_selected_count:{
			type:"checkbox",
			select:{
				0:"Checkbox A",
				1:"Checkbox B",
				2:"Checkbox C",
				3:"Checkbox D",
				4:"Checkbox E",
				5:"Checkbox F",
				6:"Checkbox G",
				7:"Checkbox H",
				8:"Checkbox I",
			},
		},
		max_selected_count:{
			type:"checkbox",
			select:{
				0:"Checkbox A",
				1:"Checkbox B",
				2:"Checkbox C",
				3:"Checkbox D",
				4:"Checkbox E",
				5:"Checkbox F",
				6:"Checkbox G",
				7:"Checkbox H",
				8:"Checkbox I",
			},
		},
		between_selected_count:{
			type:"checkbox",
			select:{
				0:"Checkbox A",
				1:"Checkbox B",
				2:"Checkbox C",
				3:"Checkbox D",
				4:"Checkbox E",
				5:"Checkbox F",
				6:"Checkbox G",
				7:"Checkbox H",
				8:"Checkbox I",
			},
		},
		like:{
			type:"textarea",
			style:"height:100px",
		},
		any:{
			type:"select",
			select:{
				"01":"Checkbox 01",
				"02":"Checkbox 02",
				"03":"Checkbox 03",
				"04":"Checkbox 04",
				"05":"Checkbox 05",
				"06":"Checkbox 06",
			},
		},
		date:{
			type:"text",
		},
		min_date:{
			type:"text",
		},
		max_date:{
			type:"text",
		},
		between_date:{
			type:"text",
		},
		is_int:{
			type:"text",
		},
		is_bool:{
			type:"text",
		},
		is_email:{
			type:"text",
		},
		is_tel:{
			type:"text",
		},
		is_ip:{
			type:"text",
		},
		is_url:{
			type:"text",
		},
		is_zip_jp:{
			type:"text",
		},
		is_katakana:{
			type:"text",
		},
		is_hiragana:{
			type:"text",
		},
		submit:{
			type:"submit",
			value:"Send",
		},
	});

});