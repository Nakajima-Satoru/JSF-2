rd2.request=function(requestName){

	var _this=function(requestName){

		var cond={
			baseUrl:"",
			url:"",
			cache:false,
			method:"get",
			headers:{},
			data:{},
			async:true,
			dataType:"json",
			callbacks:{
				before:null,
				beforeSend:null,
				done:null,
				fail:null,
				always:null,
			},			
		};

		if(requestName){
			if(!rd2._data[requestName]){
				rd2._data[requestName]=cond;
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
		this.cache=function(cache){

			if(requestName){
				rd2._data[requestName].cache=cache;
			}
			else{
				cond.cache=cache;
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

		this.callback={
			before:function(callbacks){

				if(requestName){
					rd2._data[requestName].callbacks.before=callbacks;
				}
				else{
					cond.callbacks.before=callbacks;
				}
	
				return this;
			},
			beforeSend:function(callbacks){

				if(requestName){
					rd2._data[requestName].callbacks.beforeSend=callbacks;
				}
				else{
					cond.callbacks.beforeSend=callbacks;
				}

				return this;
			},
		};

		this.send=function(option){

			if(requestName){
				cond=rd2._data[requestName];
			}

			if(cond.callbacks.before){
				var buff=cond.callbacks.before(cond);
				if(buff){
					cond=buff;
				}
			}

			var param={
				url:cond.baseUrl+cond.url,
				method:cond.method,
				data:cond.data,
				dataType:cond.dataType,
				headers:cond.headers,
				async:cond.async,
				beforeSend:function(shr,settings){
				
					if(cond.callbacks.beforeSend){
						cond.callbacks.beforeSend(shr,settings);
					}
				},
			};

			if(option.url){
				param.url=cond.baseUrl+option.url;
			}
			if(option.method){
				param.method=option.method;
			}
			if(option.data){
				var colum=Object.keys(option.data);
				for(var n=0;n<colum.length;n++){
					var field=colum[n];
					var value=option.data[field];
					param.data[field]=value;
				}
			}
			if(option.dataType){
				param.dataType=option.dataType;
			}
			if(option.headers){
				var colum=Object.keys(option.headers);
				for(var n=0;n<colum.length;n++){
					var field=colum[n];
					var value=option.headers[field];
					param.headers[field]=value;
				}
			}
			if(option.async){
				param.async=option.async;
			}
			
			var obj=function(req,cond){

				this.done=function(callback){
					req.done(function(arg1,arg2,arg3){
					
						if(cond.callbacks.done){
							cond.callbacks.done(arg1,arg2,arg3);
						}
	
						callback(arg1,arg2,arg3);	

					});

					return this;
				};

				this.fail=function(callback){

					req.fail(function(err){

						if(cond.callbacks.fail){
							cond.callbacks.fail(err);
						}
						callback(err);

					});

					return this;
				};

				this.always=function(callback){

					req.always(function(arg1,arg2,arg3){

						if(cond.callbacks.always){
							cond.callbacks.always(arg1,arg2,arg3);
						}
						callback(arg1,arg2,arg3);
					});

					return this;
				};

				this.success=function(callback){

					req.success(function(arg1,arg2,arg3){

						if(cond.callbacks.success){
							cond.callbacks.success(arg1,arg2,arg3);
						}

						callback(arg1,arg2,arg3);
					});

					return this;
				};

				this.error=function(callback){

					req.error(function(err){

						if(cond.callbacks.error){
							cond.callbacks.error(err);
						}

						callback(err);

					});

					return this;
				};

				this.complete=function(callback){

					req.complete(function(arg1,arg2,arg3){
				
						if(cond.callbacks.complete){
							cond.callbacks.complete(arg1,arg2,arg3);
						}

						callback(arg1,arg2,arg3);

					});

					return this;
				};

				this.abort=function(){
					req.abort();
				};

				this.responseJSON = req.responseJSON;
				this.responseText = req.responseText;
				this.responseText = req.responseText;
				this.status = req.status;
			};

			var req=$.ajax(param);
				
			cond.url="";
			cond.data={};
			cond.headers={};
				
			return new obj(req,cond);

		};
/*
		this.poling = function(polingName,interval){
			this.send();
			rd2._data.polingThread[polingName]=setInterval(function(){
				this.send();
			},interval);
		};

		this.polingExit:function(polingName){
			if(rd2._data.polingThread[polingName]){
				clearInterval(rd2._data.polingThread[polingName]);
			}
		};

		this.longPoling=function(longPolingName){
	

			var baseSuccessCallback=this.success;
	
			params.success=function(data,textStatus, xhr){
				baseSuccessCallback(data,textStatus, xhr);
				rd2._data.longPolingThread[longPolingName]=$.ajax(params);
			};
	
			rd2._data.longPolingThread[longPolingName]=this.send();
		},
		longPolingExit:function(longPolingName){
			if(rd2._data.longPolingThread[longPolingName]){
				rd2._data.longPolingThread[longPolingName].abort();
			}
		},
*/
	};
	return new _this(requestName);

};