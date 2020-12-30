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