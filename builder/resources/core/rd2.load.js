rd2.load=function(option){

	var wait=false;

	var callObj={
		wait:function(){
			wait=true;
		},
		release:function(){
			wait=false;
			afterMethod();
		},
	};

	if(rd2._data.callbacks[rd2CallbackConst.base.loading]){
		rd2._data.callbacks[rd2CallbackConst.base.loading](callObj);
	}

	var afterMethod=function(){
		$(function(){
			if(option.animation){
				$("pagelist").addClass(option.animation);
				rd2._status.defaultAnimationName=option.animation;
				rd2._status.animation=true;
			}
			if(option.firstUrl){
				rd2.redirect.move(option.firstUrl);
			}
		});

		$("html").on("click","a[url]",function(){

			if(!rd2._status.chattaring){
				var url=$(this).attr("url");
				var animation=$(this).attr("animation");
				var option={};
				if(animation){
					option.animation=animation;
				}
				rd2.redirect.move(url,option);	
			}

			return false;
		});

		$("html").on("click","a[backto]",function(){
			rd2.redirect.back();
			return false;
		});

		$(window).on("popstate",function(){

			if(!rd2._status.backbtn){
				if(!rd2._status.chattaring){
					rd2.redirect.back();
				}
			}
	
			return;
		});

		$("html").on("submit","form",function(e){

			var formId=$(this).attr("id");
			var getData=rd2.form(formId).getSubmitData(formId);
			
			/* load callback form-submit-all */
			if(rd2._data.callbacks[rd2CallbackConst.form.submitAll]){
				rd2._data.callbacks[rd2CallbackConst.form.submitAll](getData);
			}
			
			/* load callback form-submit */ 
			if(rd2._data.callbacks[rd2CallbackConst.form.submit+formId]){
				rd2._data.callbacks[rd2CallbackConst.form.submit+formId](getData);
			}

			return false;

		});

		$("html").on("reset","form",function(){

			var formId=$(this).attr("id");
			var getData=rd2.form(formId).getSubmitData(formId);

			/* load callback form-reset-all */ 
			if(rd2._data.callbacks[rd2CallbackConst.form.resetAll]){
				rd2._data.callbacks[rd2CallbackConst.form.resetAll](getData);
			}
			
			/* load callback form-reset */ 
			if(rd2._data.callbacks[rd2CallbackConst.form.reset+formId]){
				rd2._data.callbacks[rd2CallbackConst.form.reset+formId](getData);
			}

		});

	};

	if(!wait){
		afterMethod();
	}
};

rd2.dataControl={
	
	setNowPage:function(urlData){
		rd2._data.nowPage=urlData;
	},
	getNowPage:function(){
		return rd2._data.nowPage;
	},

	redirectPush:function(){

		var nowPage=rd2._data.nowPage;
		if(nowPage){
			rd2._data.redirectCache.push(nowPage);
		}

	},
};

rd2.text={

	uniqId:function(length){

		if(!length){
			length=16;
		}

		var libon="01234567789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var lLength=libon.length;
		var str="";
		for(var n=0;n<length;n++){
			var round=Math.round(Math.random()*lLength);
			str+=libon[round-1];
		}
		return str;
	},

};

rd2.date={

	now:function(format){
		return rd2.date.get(null,format);
	},
	get:function(date,format){

		if(date){
			var _d=new Date(date);
		}
		else{
			var _d=new Date();
		}

		if(!format){
			return _d;
		}

		var string=format;
		string=string.replace("Y",_d.getFullYear());
		string=string.replace("y",_d.getYear());
		var month=parseInt(_d.getMonth())+1;
		string=string.replace("m",("0"+month).slice(-2));
		var date=parseInt(_d.getDate());
		string=string.replace("d",("0"+date).slice(-2));
		var week=parseInt(_d.getDay());
		string=string.replace("w",week);
		var hour=parseInt(_d.getHours());
		string=string.replace("H",("0"+hour).slice(-2));
		var minute=parseInt(_d.getMinutes());
		string=string.replace("i",("0"+minute).slice(-2));
		var second=parseInt(_d.getSeconds());
		string=string.replace("s",("0"+second).slice(-2));

		string=string.replace("U",_d.getTime());

		return string;

	},
};

rd2.parse={
	url:function(url){

		var urls=url.split('/');
		var getUrlData={};
		getUrlData.url=urls[0];
		urls.shift();
		getUrlData.request=urls;

		return getUrlData;
	},
	urlDiffCheck:function(before,after){

		if(!before){
			return true;
		}

		if(before.url != after.url){
			return true;
		}

		if(before.request.toString() !== after.request.toString()){
			return true;	
		}

		return false;

	},
};

rd2.callback={
	loading:function(callbacks){
		rd2._data.callbacks[rd2CallbackConst.base.loading]=callbacks;
	},
};
