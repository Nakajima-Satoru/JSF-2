rd2.page("03_active_form").addGroup("app").before(function(obj){

	rd2.form("active_form").set({
		submit:{
			type:"submit",
			value:"Send",
		},
	});
	
	if(obj.pageObj){

		obj.pageObj.find("#add").on("click",function(){

			var param={
				name:{
					type:"text",
				},
				code:{
					type:"text",
					style:"max-width:100px",
				},
			};
	
			var callback=function(obj){
				obj.fieldObj.find(".delete").attr("data-index",obj.index);
			};
			
			rd2.form("active_form").add("active_area","active_form_part",param,callback);
		
		});
	
	}
	
	// delete btn
	$("html").on("click","#active_form .delete",function(){
		var index=$(this).attr("data-index");
		$("#active_form [index="+index+"]").remove();
	})

});
