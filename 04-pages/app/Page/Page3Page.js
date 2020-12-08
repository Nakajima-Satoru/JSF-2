rd2.page("page3").addGroup("app").before(function(obj){

	if(obj.mode=="move"){

		var value=null;
		if(obj.next){
			if(obj.next.request){
				if(obj.next.request[0]){
					value=obj.next.request[0];
				}
			}
		}
		
		obj.pageObj.find("#value").text(value);

		var next=parseInt(value)+1;
		obj.pageObj.find("#next").attr("url","page3/"+next);
	}

});