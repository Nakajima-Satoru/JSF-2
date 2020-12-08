rd2.callback.loading(function(obj){

	obj.wait();

	setTimeout(function(){

		obj.release();

	},1000);

});