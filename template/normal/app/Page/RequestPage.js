rd2.page("request").before(function(obj){

	$("#page_title").text("Request Test");

	obj.pageObj.find("#request").on("click",function(){

		rd2.request.send({
			url:"http://localhost/request_test/",
			success:function(data){
	
				console.log(data);

			},
		})

	});

	obj.pageObj.find("#poling").on("click",function(){

		rd2.request.poling("polingTest",2000,{
			url:"http://localhost/poling_test/",
			success:function(data){

				console.log(data);

			},
		})

	});
	obj.pageObj.find("#long_poling").on("click",function(){

		rd2.request.longPoling("longPolingTest",{
			url:"http://localhost/long_poling_test/",
			success:function(data){

				console.log(data);

			},
		})

	});

}).leave(function(obj){

	rd2.request.polingExit("polingTest");
	rd2.request.longPolingExit("longPolingTest");

});