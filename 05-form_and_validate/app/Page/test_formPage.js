rd2.page("test_form").addGroup("app").before(function(obj){

	rd2.form("test").set({
		name:{
			type:"text",
		},
		code:{
			type:"text",
			style:"max-width:100px"
		},
		pullldown:{
			type:"select",
			empty:"-- Select menu --",
			select:{
				0:"Select A",
				1:"Select B",
				2:"Select C",
				3:"Select D",
			},
		},
		radio:{
			type:"radio",
			select:{
				0:"Radio A",
				1:"Radio B",
				2:"Radio C",
				3:"Radio D",
				4:"Radio E",
				5:"Radio F",
				6:"Radio G",
				7:"Radio H",
				8:"Radio I",
				9:"Radio J",
			},
		},
		checkbox:{
			type:"checkbox",
			select:{
				0:"CheckBox A",
				1:"CheckBox B",
				2:"CheckBox C",
				3:"CheckBox D",
				4:"CheckBox E",
				5:"CheckBox F",
				6:"CheckBox G",
				7:"CheckBox H",
				8:"CheckBox I",
				9:"CheckBox J",
			},
		},
		message:{
			type:"textarea",
			placeholder:"Message Area...",
			style:"min-height:200px",
		},
		file:{
			type:"file",
		},
		submit:{
			type:"submit",
			value:"Send",
		},
	});

});