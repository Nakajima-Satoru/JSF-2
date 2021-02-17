/*
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
*/
rd2.request=function(requestName){

	var _this=function(requestName){

		if(!rd2._data[requestName]){
			rd2._data[requestName]={
				baseUrl:"",
				url:"",
				method:"get",
				headers:{},
				data:{},
				async:false,
				dataType:"json",
			};
		}

		this.set=function(params){
			rd2._data[requestName]=params;
			return this;
		};

		this.baseUrl=function(url){
			rd2._data[requestName].baseUrl=url;
			return this;
		};

		this.url=function(url){
			rd2._data[requestName].url=url;
			return this;
		};

		this.method=function(method){
			rd2._data[requestName].method=method;
			return this;
		};

		this.setHeader=function(params){

			var colum=Object.keys(params);
			var length=colum.length;

			for(var n=0;n<length;n++){
				var field=colum[n];
				var value=params[field];

				rd2._data[requestName].headers[field]=value;
			}

			return this;
		};

		this.setData=function(params){

			var colum=Object.keys(params);
			var length=colum.length;

			for(var n=0;n<length;n++){
				var field=colum[n];
				var value=params[field];

				rd2._data[requestName].data[field]=value;
			}
		
			return this;
		};

		this.dataType=function(type){
			rd2._data[requestName].dataType=type;
			return this;
		};

		this.async=function(async){
			rd2._data[requestName].async=async;
			return true;
		};

		this.send=function(){

			var cond=rd2._data[requestName];

			var param={
				url:cond.baseUrl+cond.url,
				method:cond.method,
				data:cond.data,
				headers:cond.headers,
			};

			console.log(param);

			var obj=$.ajax(param);

			return obj;
		};

	};
	return new _this(requestName);

};