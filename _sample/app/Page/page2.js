rd2.page("page2").addGroup("app").before(function(obj){

	setTitle("Page2");

	if(obj.mode=="move"){
	
		var arg=0;
		if(obj.next.request[0]){
			arg=obj.next.request[0];
		}
	
		obj.pageObj.find(".arg").text(arg);
		
		var next=parseInt(arg)+1;
		obj.pageObj.find(".link_next").attr("url","page2/"+next);	

		if(arg>1){
			var back=parseInt(arg)-1;
			obj.pageObj.find(".link_back").attr("url","page2/"+back);	
		}
		else{
			obj.pageObj.find(".link_back").css("display","none");
		}

	}

});