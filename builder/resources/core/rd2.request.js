rd2.request={
	send:function(params){
		$.ajax(params);
	},
	poling:function(polingName,interval,params){
		$.ajax(params);
		rd2._data.polingThread[polingName]=setInterval(function(){
			$.ajax(params);
		},interval);
	},
	polingExit:function(polingName){
		if(rd2._data.polingThread[polingName]){
			clearInterval(rd2._data.polingThread[polingName]);
		}
	},
	longPoling:function(longPolingName,params){

		var baseSuccessCallback=params.success;

		params.success=function(data,textStatus, xhr){
			baseSuccessCallback(data,textStatus, xhr);
			rd2._data.longPolingThread[longPolingName]=$.ajax(params);
		};

		rd2._data.longPolingThread[longPolingName]=$.ajax(params);
	},
	longPolingExit:function(longPolingName){
		if(rd2._data.longPolingThread[longPolingName]){
			rd2._data.longPolingThread[longPolingName].abort();
		}
	},
};