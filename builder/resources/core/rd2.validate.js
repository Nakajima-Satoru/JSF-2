rd2.validate=function(validateName){

	var _this=function(validateName){

		this._value=null;

		this.value=function(name){
			if(this._value[name]){
				return this._value[name];
			}
		};
		this.verify=function(post,noOrrorOutputed){

			this._value=post;
			rd2.validateRule._value=post;

			var response=null;

			var validate=rd2._data.validates[validateName];
			if(!validate){
				return;
			}

			var colum=Object.keys(validate);
			var length=colum.length;
			for(var n=0;n<length;n++){
				var name=colum[n];

				var vrules=validate[name];
				var vrulesColum=Object.keys(vrules);
				var vrulesLength=vrulesColum.length;
				for(var n2=0;n2<vrulesLength;n2++){
					var vrule=vrules[vrulesColum[n2]];

					var rule=vrule.rule;

					if(typeof rule =="string"){
						rule=[rule];
					}

					var sendRule=[];
					var ruleLength=rule.length;
					for(var rn_=0;rn_<ruleLength;rn_++){
						if(rule[rn_][0]=="@"){
							var bufferName=rule[rn_].substring(1);
							var bufferValue=this.value(bufferName);
							sendRule[rn_]=bufferValue;
						}
						else{
							sendRule[rn_]=rule[rn_];
						}
					}

					var jugement=true;
					if(rd2.validateRule[sendRule[0]]){
						jugement=rd2.validateRule[rule[0]](post[name],sendRule[1],sendRule[2],sendRule[3]);
					}
					else{
						if(rd2._data.callbacks["VALIDATE_CUSTOM_"+sendRule[0]]){
							jugement=rd2._data.callbacks["VALIDATE_CUSTOM_"+sendRule[0]](post[name],sendRule[1],sendRule[2],sendRule[3]);
						}
					}

					if(vrule.message){
						var message=vrule.message;
					}
					else{
						var message="validate error [field="+name+", rule="+sendRule[0];
						if(sendRule[1]){
							message+=", aregument1="+sendRule[1];
						}
						if(sendRule[2]){
							message+=", aregument1="+sendRule[2];
						}
						if(sendRule[3]){
							message+=", aregument1="+sendRule[3];
						}
						message+="]";
					}

					if(!jugement){
						if(!response){
							response={};
						}
						response[name]=message;
					}
				}

			}

			if(!noOrrorOutputed){
				this.outputError(response);
			}

			return response;

		};
		this.set=function(validates){
			rd2._data.validates[validateName]=validates;
			return this;
		};
		this.addRule=function(){

			var field=arguments[0];

			if(!rd2._data.validates[validateName]){
				rd2._data.validates[validateName]={};
			}
			if(!rd2._data.validates[validateName][field]){
				rd2._data.validates[validateName][field]=[];
			}

			if(arguments.length==2){
				var rule=arguments[1];
				rd2._data.validates[validateName][field].push(rule);
			}
			else if(areguments.length>=3){
				var section=arguments[1];
				var rule=arguments[2];
				rd2._data.validates[validateName][field][section]=rule;
			}

			return this;
		};
		this.deleteRule=function(){

			var field=arguments[0];

			if(arguments.length>=2){
				var section=arguments[1];
				delete rd2._data.validates[validateName][field][section];
			}
			else{
				delete rd2._data.validates[validateName][field];
			}

			return this;
		};
		this.addCustom=function(ruleName,callback){
			rd2._data.callbacks["VALIDATE_CUSTOM_"+ruleName]=callback;
			return this;
		};
		this.outputError=function(validateErrorData){

			var obj=$("#"+validateName);
			obj.find("[error]").html("");

			if(!validateErrorData){
				return;
			}

			var vedColum=Object.keys(validateErrorData);
			var vedLength=vedColum.length;

			if(!validateErrorData){
				return;
			}

			for(var n=0;n<vedLength;n++){
				var name=vedColum[n];
				var message=validateErrorData[name];
				var errorObj=obj.find("[error="+name+"]");
				errorObj.html('<div class="error">'+message+'</div>');
			}
		
		};
	};

	return new _this(validateName);
};
