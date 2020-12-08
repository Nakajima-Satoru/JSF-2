rd2.page("active_form").addGroup("app").before(function(obj){

	rd2.form("active_form").set({
		submit:{
			type:"submit",
			value:"Send",
		},
	});

	obj.pageObj.find("#add").on("click",function(){

		rd2.form("active_form").add("active_area","active_form_part",{
			name:{
				type:"text",
			},
			code:{
				type:"text",
				style:"max-width:100px",
			},
		},function(obj){
			
			obj.fieldObj.find(".delete").on("click",function(){
				obj.fieldObj.remove();
			});

		});
	
	});

});