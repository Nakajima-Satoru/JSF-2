rd2.validateRule={

	_value:null,

	required:function(value){
				
		if(value){
			return true;
		}

		return false;
	},
	alphaNumeric:function(value,arg1){
		
		if(!value){
			return true;
		}

		var reg="^[a-zA-Z0-9"+arg1+"]+$";

		if(rd2.validateRule.regex(value,reg)){
			return true;
		}

		return false;
	},
	numeric:function(value,arg1){
		
		if(!value){
			return true;
		}

		var reg="^[0-9"+arg1+"]+$";

		if(rd2.validateRule.regex(value,reg)){
			return true;
		}

		return false;
	},
	length:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length==arg1){
			return true;
		}

		return false;
	},
	minLength:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length>=arg1){
			return true;
		}
		return false;
	},
	maxLength:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length<=arg1){
			return true;
		}

		return false;
	},
	betweenLength:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.length>=arg1 && value.length>=arg2){
			return true;
		}

		return false;

	},
	value:function(value,arg1){

		console.log("arg1="+arg1);

		if(!value){
			return true;
		}

		if(parseInt(value)==parseInt(arg1)){
			return true;
		}

		return false;

	},
	minValue:function(value,arg1){

		if(!value){
			return true;
		}

		if(parseInt(value)>=parseInt(arg1)){
			return true;
		}

		return false;
	},
	maxValue:function(value,arg1){

		if(!value){
			return true;
		}

		if(parseInt(value)<=parseInt(arg1)){
			return true;
		}
	
		return false;
	},
	betweenValue:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(parseInt(value)>=parseInt(arg1) && parseInt(value)<=parseInt(arg2)){
			return true;
		}
		
		return false;	
	},
	selectedCount:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length==arg1){
			return true;
		}

		return false;
	},
	minSelectedCount:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length>=arg1){
			return true;
		}

		return false;
	},
	maxSelectedCount:function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length<=arg1){
			return true;
		}

		return false;
	},
	betweenSelectedCount:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.length>=arg1 && value.length<=arg2){
			return true;
		}

		return false;
	},
	like:function(value,arg1){

		if(!value){
			return true;
		}
	
		if(value.indexOf(arg1)>0){
			return true;
		}

		return false;	
	},
	any:function(value,arg1){

		if(!value){
			return true;
		}

		if(typeof value == "string"){
			value=[value];
		}

		if(typeof arg1 == "string"){
			arg1=[arg1];
		}

		var arg1Length=arg1.length;
		var juges=false;
		for(var n=0;n<arg1Length;n++){
			var valueLength=value.length;
			for(var n2=0;n2<valueLength;n2++){
				if(arg1[n]==value[n2]){
					juges=true;
					break;
				}
			}
		}

		return juges;

	},
	date:function(value){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var juges=parseInt(tims.getTime());

		if(juges>0){
			return true;
		}

		return false;
	},
	minDate:function(value,arg1){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		if(target_date>=mindate){
			return true;
		}

		return false;
	},
	maxDate:function(value,arg1){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		if(target_date<=mindate){
			return true;
		}

		return false;
	},
	betweenDate:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		var tims3=new Date(arg2);
		var mindate2=parseInt(tims3.getTime());

		if(target_date>=mindate && target_date<=mindate2){
			return true;
		}

		return false;
	},
	isInt:function(value){

		if(!value){
			return true;
		}

		if(!isNaN(value)){
			return true;
		}

		return false;
	},
	isBool:function(value){

		if(!value){
			return true;
		}

		if(value==0 || value==1){
			return true;
		}

		return false;
	},
	isEmail:function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9a-z_./?-]+@([0-9a-z_./?-]+\.)+[0-9a-z-]+$/)){
			return true;
		}

		return false;
	},
	isTel:function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/)){
			return true;
		}

		if(value.match(/^[0-9]{1,15}$/)){
			return true;
		}

		return false;
	},
	isIp:function(value){

		if(!value){
			return true;
		}

		if(value.match(/(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/)){
			return true;
		}

		return false;
	},
	isUrl:function(value){

		if(!value){
			return true;
		}

		if(value.match(/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i)){
			return true;
		}

		return false;	
	},
	regex:function(value,arg1){

		if(!value){
			return true;
		}

		if(arg1.substring(arg1.length-2)=="/i"){
			arg1=allowChar.substring(0,(arg1.length-2));
		}
		if(arg1[0]=="/"){
			arg1=arg1.substring(1);
		}

		var regExp=new RegExp(arg1);
		if(value.match(regExp)){
			return true;
		}

		return false;	
	},
	isZipJP:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.match(/^([0-9]{3}-[0-9]{4})?$|^[0-9]{7}$/)){
			return true;
		}

		return false;
	},
	isKatakana:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.match(/^[ァ-ヶー]+$/u)){
			return true;
		}

		return false;
	},
	isHiragana:function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.match(/^[ぁ-ん]+$/u)){
			return true;
		}

		return false;
	},
};

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
