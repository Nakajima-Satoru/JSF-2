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

		var cond={
			baseUrl:"",
			url:"",
			method:"get",
			headers:{},
			data:{},
			async:false,
			dataType:"json",
		};

		if(requestName){
			if(!rd2._data[requestName]){
				rd2._data[requestName]=cond;
			}
			else{
				requestName=null;
			}
		}

		this.set=function(params){
			var colum=Object.keys(params);
			var length=colum.length;

			for(var n=0;n<length;n++){
				var field=colum[n];
				var value=params[field];

				if(requestName){
					rd2._data[requestName][field]=value;
				}
				else{
					cond[field]=value;
				}
			}
			return this;
		};

		this.baseUrl=function(url){

			if(requestName){
				rd2._data[requestName].baseUrl=url;
			}
			else{
				cond.baseUrl=url;
			}

			return this;
		};

		this.url=function(url){

			if(requestName){
				rd2._data[requestName].url=url;
			}
			else{
				cond.url=url;
			}

			return this;
		};

		this.method=function(method){
			
			if(requestName){
				rd2._data[requestName].method=method;
			}
			else{
				cond.method=method;
			}

			return this;
		};

		this.setHeader=function(params){

			var colum=Object.keys(params);
			var length=colum.length;

			for(var n=0;n<length;n++){
				var field=colum[n];
				var value=params[field];

				if(requestName){
					rd2._data[requestName].headers[field]=value;
				}
				else{
					cond.headers[field]=value;
				}
			}

			return this;
		};

		this.data=function(params){

			var colum=Object.keys(params);
			var length=colum.length;

			for(var n=0;n<length;n++){
				var field=colum[n];
				var value=params[field];

				if(requestName){
					rd2._data[requestName].data[field]=value;
				}
				else{
					cond.data[field]=value;
				}
			}
		
			return this;
		};

		this.dataType=function(type){
			
			if(requestName){
				rd2._data[requestName].dataType=type;
			}
			else{
				cond.dataType=type;
			}

			return this;
		};

		this.async=function(async){

			if(requestName){
				rd2._data[requestName].async=async;
			}
			else{
				cond.async=async;
			}

			return true;
		};

		this.send=function(){

			if(requestName){
				cond=rd2._data[requestName];
			}

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