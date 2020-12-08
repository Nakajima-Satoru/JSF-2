const rd2CallbackConst={
	base:{
		loading:"BASE_LOADING_",
	},
	page:{
		before:"PAGE_BEFORE_",
		after:"PAGE_AFTER_",
		leave:"PAGE_LEAVE_",
		beforeAll:"PAGE_BEFORE_All",
		afterAll:"PAGE_AFTER_All",
		leaveAll:"PAGE_LEAVE_All",
	},
	group:{
		before:"GROUP_BEFORE_",
		after:"GROUP_AFTER_",
		leave:"GROUP_LEAVE_",
	},
	form:{
		submit:"FORM_SUBMIT_",
		reset:"FORM_RESET_",
		submitAll:"FORM_SUBMIT_ALL",
		resetAll:"FORM_RESET_ALL",
	},
};

var rd2={

	_data:{
		first:{},
		nowPage:null,
		pageCache:{},
		redirectCache:[],
		callbacks:{},
		validates:{},
		polingThread:{},
		longPolingThread:{},
		pageGroup:{},
		viewCache:{},
	},

	_status:{
		zindex:0,
		animation:false,
		defaultAnimationName:null,
		changeAnimationName:null,
		chattaring:false,
		backbtn:false,
		pageExit:false,
		pageWait:false,
	},

	load:function(option){

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
		console.log(wait);

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
					rd2.redirect.move(url);	
				}
	
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

	},

	dataControl:{
		
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
	},

	text:{

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
	
	},

	date:{

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
	},

	parse:{
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
	},

	callback:{
		loading:function(callbacks){
			rd2._data.callbacks[rd2CallbackConst.base.loading]=callbacks;
		},
	},

	/**
	 * redirect
	 */
	redirect:{
		move:function(url,option){

			$("pagelist").removeClass("back");

			if(!option){
				option={};
			}

			if(option.animation){
				rd2.redirect.changeAnimation(option.animation);
			}
			
			rd2._status.pageWait=false;

			history.pushState(null,null,null);

			var nowPageData=rd2.dataControl.getNowPage();
			var nextPageData=rd2.parse.url(url);
			rd2._status.zindex++;
			nextPageData.index=rd2._status.zindex;

			if(!rd2.parse.urlDiffCheck(nowPageData,nextPageData)){
				return;
			}

			var html="";
			if(rd2._data.pageCache[nextPageData.url]){
				html=decodeURIComponent(escape(atob(rd2._data.pageCache[nextPageData.url])));
			}

			nextPageData.pageId=rd2.text.uniqId();

			/* callback before + leave */ 

			/* set call data */ 
			var callData={
				page:nextPageData.url,
				mode:"move",
				next:{
					url:nextPageData.url,
					request:nextPageData.request,
					pageId:nextPageData.pageId,	
				},
				exit:function(){
					rd2._status.pageExit=true;
					return this;
				},
				wait:function(){
					rd2._status.pageWait=true;
					return this;
				},
				release:function(){
					rd2._status.pageWait=false;
					afterCall();
					return this;
				},
				move:function(url,option){
					rd2.redirect.move(url,option);
					rd2._status.pageWait=true;
					return this;
				},
				back:function(){
					rd2.redirect.back();
					rd2._status.pageWait=true;
					return this;
				},
				changeAnimation:function(animationName){
					rd2.redirect.changeAnimation(animationName);
					return this;
				},
				revertAnimation:function(option){
					rd2.redirect.revertAnimation(option);
					return this;
				},
				resetRedirectCache:function(){
					rd2.redirect.resetRedirectCache();
					return this;
				},
			};
			if(nowPageData){
				callData.now={
					url:nowPageData.url,
					request:nowPageData.request,
					pageId:nowPageData.pageId,
				};
			}

			if(html){
				$("pagelist").append('<page data-pid="'+nextPageData.pageId+'" style="display:none">'+html+'</page>');
				var openPage=$("pagelist page[data-pid="+nextPageData.pageId+"]");
				callData.pageObj=openPage;
			}

			if(nowPageData){

				/* load callback group leave */
				if(rd2._data.pageGroup[nowPageData.url]){
					var groupList=rd2._data.pageGroup[nowPageData.url];
					var groupListLength=groupList.length;
					for(var n=0;n<groupListLength;n++){
						var group=groupList[n];
						if(rd2._data.callbacks[rd2CallbackConst.group.leave+group]){
							rd2._data.callbacks[rd2CallbackConst.group.leave+group](callData);
						}
					}
				}

				/* load callback leave */ 
				if(rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url]){
					rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url](callData);
				}	

			}

			/* load callback group before */
			if(rd2._data.pageGroup[nextPageData.url]){
				var groupList=rd2._data.pageGroup[nextPageData.url];
				var groupListLength=groupList.length;
				for(var n=0;n<groupListLength;n++){
					var group=groupList[n];
					if(rd2._data.callbacks[rd2CallbackConst.group.before+group]){
						rd2._data.callbacks[rd2CallbackConst.group.before+group](callData);
					}
				}
			}

			/* load callback before */ 
			if(rd2._data.callbacks[rd2CallbackConst.page.before+nextPageData.url]){
				rd2._data.callbacks[rd2CallbackConst.page.before+nextPageData.url](callData);
			}
			
			if(!html){
				return;
			}

			var afterCall=function(){

				/* chattaring = true; */ 
				rd2._status.chattaring=true;

				$("pagelist").addClass("move");
				
				$("pagelist page[data-pid="+nextPageData.pageId+"]").removeAttr('style');

				openPage.addClass("open").removeClass("closed").attr("style","z-index:"+nextPageData.index);
	
				if(nowPageData){
					var closePage=$("pagelist page[data-pid="+nowPageData.pageId+"]");
					closePage.addClass("closed").removeClass("open");
	
					var afterMove=function(){

						/* load callback group after */
						if(rd2._data.pageGroup[nextPageData.url]){
							var groupList=rd2._data.pageGroup[nextPageData.url];
							var groupListLength=groupList.length;
							for(var n=0;n<groupListLength;n++){
								var group=groupList[n];
								if(rd2._data.callbacks[rd2CallbackConst.group.after+group]){
									rd2._data.callbacks[rd2CallbackConst.group.after+group](callData);
								}
							}
						}

						/* load callback after */ 
						if(rd2._data.callbacks[rd2CallbackConst.page.after+nextPageData.url]){
							rd2._data.callbacks[rd2CallbackConst.page.after+nextPageData.url](callData);
						}


						openPage.removeClass("open");
						closePage.removeClass("closed");
						closePage.remove();			
						$("pagelist").removeClass("move");

					};

					if(rd2._status.animation){
						setTimeout(function(){
							afterMove();
						},500);	
					}
					else{
						afterMove();
					}
	
				}
	
				nextPageData.html=openPage.html();
	
				/* chattaring = false; */ 
				if(rd2._status.animation){
					setTimeout(function(){
						rd2._status.chattaring=false;
						$("pagelist").removeClass("move");
						if(option.animation){
							rd2.redirect.revertAnimation();
						}
					},500);
				}
				else{
					rd2._status.chattaring=false;					
				}
				
				rd2.dataControl.redirectPush();
				rd2.dataControl.setNowPage(nextPageData);

			};

			if(!rd2._status.pageWait){
				afterCall();
			}

			return this;
		},
		back:function(option){
			
			if(!option){
				option={};
			}

			if(option.animation){
				rd2.redirect.changeAnimation(option.animation);
			}

			rd2._status.pageWait=false;

			var nowPageData=rd2.dataControl.getNowPage();
			var backPageData=rd2._data.redirectCache.pop();

			if(!backPageData){
				return;
			}

			/* callback before + leave */ 

			/* set call data */ 
			var callData={
				mode:"back",
				back:{
					url:backPageData.url,
					request:backPageData.request,
					pageId:backPageData.pageId,	
				},
				now:{
					url:nowPageData.url,
					request:nowPageData.request,
					pageId:nowPageData.pageId,
				},
				exit:function(){
					rd2._status.pageExit=true;
					return this;
				},
				wait:function(){
					rd2._status.pageWait=true;
					return this;
				},
				release:function(){
					rd2._status.pageWait=false;
					afterCall();
					return this;					
				},
				changeAnimation:function(animationName){
					rd2.redirect.changeAnimation(animationName);
					return this;
				},
				revertAnimation:function(){
					rd2.redirect.revertAnimation();
					return this;
				},
				resetRedirectCache:function(){
					rd2.redirect.resetRedirectCache();
					return this;
				},
			};

			/* load callback group leave */
			if(rd2._data.pageGroup[nowPageData.url]){
				var groupList=rd2._data.pageGroup[nowPageData.url];
				var groupListLength=groupList.length;
				for(var n=0;n<groupListLength;n++){
					var group=groupList[n];
					if(rd2._data.callbacks[rd2CallbackConst.group.leave+group]){
						rd2._data.callbacks[rd2CallbackConst.group.leave+group](callData);
					}
				}
			}

			/* load callback leave */ 
			if(rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url]){
				rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url](callData);
			}

			/* load callback group before */
			if(rd2._data.pageGroup[backPageData.url]){
				var groupList=rd2._data.pageGroup[backPageData.url];
				var groupListLength=groupList.length;
				for(var n=0;n<groupListLength;n++){
					var group=groupList[n];
					if(rd2._data.callbacks[rd2CallbackConst.group.before+group]){
						rd2._data.callbacks[rd2CallbackConst.group.before+group](callData);
					}
				}
			}

			/* load callback before */ 
			if(rd2._data.callbacks[rd2CallbackConst.page.before+backPageData.url]){
				rd2._data.callbacks[rd2CallbackConst.page.before+backPageData.url](callData);
			}

			var afterCall=function(){
				rd2._status.zindex--;

				$("pagelist").addClass("back");

				var closePage=$("pagelist page[data-pid="+nowPageData.pageId+"]");
				closePage.addClass("closed").removeClass("open");

				$("pagelist").prepend('<page data-pid="'+backPageData.pageId+'">'+backPageData.html+'</page>');
				var openPage=$("pagelist page[data-pid="+backPageData.pageId+"]");
				openPage.addClass("open").attr("style","z-index:"+backPageData.index);

				var afterMove=function(){

					callData.pageObj=openPage;

					/* load callback group after */
					if(rd2._data.pageGroup[backPageData.url]){
						var groupList=rd2._data.pageGroup[backPageData.url];
						var groupListLength=groupList.length;
						for(var n=0;n<groupListLength;n++){
							var group=groupList[n];
							if(rd2._data.callbacks[rd2CallbackConst.group.after+group]){
								rd2._data.callbacks[rd2CallbackConst.group.after+group](callData);
							}
						}
					}

					/* load callback after */ 
					if(rd2._data.callbacks[rd2CallbackConst.page.after+backPageData.url]){
						rd2._data.callbacks[rd2CallbackConst.page.after+backPageData.url](callData);
					}

					closePage.remove();
					openPage.removeClass("open");

				};
				
				if(rd2._status.animation){
					setTimeout(function(){
						afterMove();
						if(option.animation){
							rd2.redirect.revertAnimation();
						}
					},400);
				}
				else{
					afterMove();
				}
				
				backPageData.html=openPage.html();
				rd2.dataControl.setNowPage(backPageData);

			};

			if(!rd2._status.pageWait){
				afterCall();
			}

			return this;
		},
		disable:function(juge){
			rd2._status.chattaring=juge;
			rd2._status.backbtn=juge;
		},
		stopAnimation:function(){
			rd2._status.animation=false;
		},
		startAnimation:function(){
			rd2._status.animation=true;
		},
		changeAnimation:function(animationName){
			rd2._status.changeAnimationName=animationName;
			$("pagelist").removeClass(rd2._status.defaultAnimationName);
			$("pagelist").addClass(animationName);
		},
		revertAnimation:function(){
			console.log(rd2._status.defaultAnimationName);
			$("pagelist").removeClass(rd2._status.changeAnimationName);
			$("pagelist").addClass(rd2._status.defaultAnimationName);
			rd2._status.changeAnimationName=null;
		},
		resetRedirectCache:function(){
			rd2._data.redirectCache=[];
		},
	},

	page:function(pageName){

		var _this=function(pageName){

			this.set=function(param){

				if(param.addGroup){
					this.addGroup(param.addGroup);
				}
				if(param.before){
					this.before(param.before);
				}
				if(param.after){
					this.after(param.after);
				}
				if(param.leave){
					this.leave(param.leave);
				}

			};

			this.addGroup=function(groupList){
				var groupLength=groupList.length;
				for(var n=0;n<groupLength;n++){

					var group=groupList[n];
					if(!rd2._data.pageGroup[pageName]){
						rd2._data.pageGroup[pageName]=[];
					}
					rd2._data.pageGroup[pageName].push(group);
				}
				return this;
			};
			this.before=function(callback){
				rd2._data.callbacks[rd2CallbackConst.page.before+pageName]=callback;
				return this;
			};
			this.after=function(callback){
				rd2._data.callbacks[rd2CallbackConst.page.after+pageName]=callback;
				return this;
			};
			this.leave=function(callback){
				rd2._data.callbacks[rd2CallbackConst.page.leave+pageName]=callback;
				return this;
			};

		};

		return new _this(pageName);

	},

	group:function(groupName){

		var _this=function(groupName){

			this.set=function(param){
				if(param.addPage){
					this.addPage(param.addPage);
				}
				if(param.before){
					this.before(param.before);
				}
				if(param.after){
					this.after(param.after);
				}
				if(param.leave){
					this.leave(param.leave);
				}
			};

			this.addPage=function(pageNames){

				var pageLength=pageNames.length;
				for(var n=0;n<pageLength;n++){

					var pageName=pageNames[n];
					if(!rd2._data.pageGroup[pageName]){
						rd2._data.pageGroup[pageName]=[];
					}
					rd2._data.pageGroup[pageName].push(groupName);
				}
				return this;
			};

			this.before=function(callback){
				rd2._data.callbacks[rd2CallbackConst.group.before+groupName]=callback;
				return this;
			};
			this.after=function(callback){
				rd2._data.callbacks[rd2CallbackConst.group.after+groupName]=callback;
				return this;
			};
			this.leave=function(callback){
				rd2._data.callbacks[rd2CallbackConst.group.leave+groupName]=callback;
				return this;
			};

		};

		return new _this(groupName);

	},

	formBuild:{
		tag:{
			input:function(name,option){

				var optionStr="";
				var colum=Object.keys(option);
				var length=colum.length;
				for(var n2=0;n2<length;n2++){
					var _name=colum[n2];
					var _value=option[_name];
					optionStr+=" "+_name+'="'+_value+'"'
				}

				if(
					option.type=="submit" || 
					option.type=="button" || 
					option.type=="reset"
				){
					name=null;
				}

				if(name){
					var tagStr='<input name="'+name+'" '+optionStr+'>';
				}
				else{
					var tagStr='<input '+optionStr+'>';
				}

				return tagStr;
			},
			textarea:function(name,option){

				delete option.type;

				var textareaValue="";
				if(option.value){
					var textareaValue=option.value;
					delete option.value;
				}

				var optionStr="";
				var colum=Object.keys(option);
				var length=colum.length;
				for(var n2=0;n2<length;n2++){
					var _name=colum[n2];
					var _value=option[_name];
					optionStr+=" "+_name+'="'+_value+'"'
				}

				var tagStr='<textarea name="'+name+'" '+optionStr+'>'+textareaValue+'</textarea>';

				return tagStr;	

			},
			select:function(name,option){

				delete option.type;

				if(option.select){
					var selects=option.select;
					delete option.select;
				}
				if(option.empty){
					var empty=option.empty;
					delete option.empty;
				}

				var selectValue="";
				if(option.value){
					var selectValue=option.value;
					delete option.value;
				}

				var optionStr="";
				var colum=Object.keys(option);
				var length=colum.length;
				for(var n2=0;n2<length;n2++){
					var _name=colum[n2];
					var _value=option[_name];
					optionStr+=" "+_name+'="'+_value+'"'
				}

				var tagStr='<select name="'+name+'" '+optionStr+'>';

				if(empty){
					tagStr+='<option value="">'+empty+'</option>';
				}

				if(selects){
					var selectColum=Object.keys(selects);
					var selectLength=selectColum.length;
					for(var n2=0;n2<selectLength;n2++){
						var _sname=selectColum[n2];
						var _svalue=selects[_sname];
						var selected="";

						if(_sname===selectValue){
							selected="selected";
						}
						tagStr+='<option value="'+_sname+'" '+selected+'>'+_svalue+'</option>';
					}
				}

				tagStr+="</select>";

				return tagStr;

			},
			radio:function(name,option){

				if(!option.select){
					return;
				}
				var radioSelect=option.select;
				delete option.select;

				if(option.value){
					var radioValue=option.value;
					delete option.value;
				}

				var tagStr="";
				var rColum=Object.keys(radioSelect);
				var rLength=rColum.length;
				for(var n=0;n<rLength;n++){
					var _name=rColum[n];
					var _value=radioSelect[_name];
					var id="radio."+name+"."+_name
					option.id=id;
					option.value=_name;
					delete option.checked;
					if(radioValue==_name){
						option.checked=true;
					}

					tagStr+='<span class="radio">';
					tagStr+=rd2.formBuild.tag.input(name,option);
					tagStr+='<label for="'+id+'">'+_value+'</label>'
					tagStr+="</span>";

				}

				return tagStr;
			},
			checkbox:function(name,option){

				if(!option.select){
					return;
				}
				var checkboxSelect=option.select;
				delete option.select;

				if(option.value){
					var checkboxValue=option.value;
					delete option.value;
				}

				var tagStr="";
				var cColum=Object.keys(checkboxSelect);
				var cLength=cColum.length;
				for(var n=0;n<cLength;n++){
					var _name=cColum[n];
					var _value=checkboxSelect[_name];
					var id="checkbox."+name+"."+_name
					option.id=id;
					option.value=_name;
					
					delete option.checked;
					if(checkboxValue){
						var cbLength=checkboxValue.length;
						for(var n2=0;n2<cbLength;n2++){
							if(checkboxValue[n2]==_name){
								option.checked=true;
								break;
							}
						}
					}

					tagStr+='<span class="checkbox">';
					tagStr+=rd2.formBuild.tag.input(name,option);
					tagStr+='<label for="'+id+'">'+_value+'</label>'
					tagStr+="</span>";
				}

				return tagStr;
			},
		},
	},
	form:function(formId){

		var _this=function(formId){

			this.set=function(option,option2nd){

				var oColum=Object.keys(option);
				var oLength=oColum.length;
				for(var n=0;n<oLength;n++){
					var name=oColum[n];
					var param=option[name];
					var type=param.type;
	
					var string="";
	
					var name2=name;
					if(option2nd){
						var name2=option2nd.field+"."+option2nd.index+"."+name;
					}

					if(type=="select"){
						string=rd2.formBuild.tag.select(name2,param);
					}
					else if(type=="textarea"){
						string=rd2.formBuild.tag.textarea(name2,param);
					}
					else if(type=="radio"){
						string=rd2.formBuild.tag.radio(name2,param);
					}
					else if(type=="checkbox"){
						string=rd2.formBuild.tag.checkbox(name2,param);
					}
					else{
						string=rd2.formBuild.tag.input(name2,param);
					}
	
					if(option2nd){
						$("form#"+formId+" [field="+option2nd.field+"] [index="+option2nd.index+"] [field="+name+"]").html(string);
					}
					else{
						$("form#"+formId+" [field="+name+"]").html(string);
					}

				}
	
				return this;
			};

			this.add=function(fieldName,viewName,option,callbacks){

				var index=parseInt($("form#"+formId+" [field="+fieldName+"] [index]:last-child").attr("index"));
				if(!index){
					index=0;
				}
				index++;

				var content=rd2.view.open(viewName);		
				$("form#"+formId+" [field="+fieldName+"]").append('<div index="'+index+'">'+content+'</div>');
				this.set(option,{
					index:index,
					field:fieldName,
				});

				if(callbacks){
					var obj={
						field:fieldName,
						index:index,
						fieldObj:$("form#"+formId+" [field="+fieldName+"] [index="+index+"]"),
					};
					callbacks(obj);
				}

			};

			this.delete=function(fieldName,index){

				if(index){
					$("form#"+formId+" [field="+fieldName+"] [index="+index+"]").html("");
				}
				else{
					$("form#"+formId+" [field="+fieldName+"]").html("");
				}

			};

			this.setData=function(data){
			
				var obj=$("form#"+formId);
	
				var colum=Object.keys(data);
				var length=colum.length;
				for(var n=0;n<length;n++){
	
					var name=colum[n];
					var value=data[name];
	
					var nameObj=obj.find("[name="+name+"]");
	
					if(nameObj.attr("type")=="radio"){
						$(nameObj.selector+"[value="+value+"]").prop("checked",true);
					}
					else if(nameObj.attr("type")=="checkbox"){
	
						nameObj.prop("checked",false);
	
						if(typeof value == "string"){
							value=[value];
						}
	
						for(var n2=0;n2<value.length;n2++){
							var nameObj=obj.find("[name="+name+"][value="+value[n2]+"]");
							nameObj.prop("checked",true);
						}
		
					}
					else{
						nameObj.val(value);					
					}
		
				}

				return this;	
			};
			this.submit=function(){
				$("#"+formId).submit();
				return this;
			};
			this.reset=function(){
				$("#"+formId).reset();
				return this;
			};
			this.callSubmit=function(callback){
				rd2._data.callbacks[rd2CallbackConst.form.submit+formId]=callback;
				return this;
			};
			this.callReset=function(callback){
				rd2._data.callbacks[rd2CallbackConst.form.reset+formId]=callback;
				return this;
			};
			this.callSubmitAll=function(callback){
				rd2._data.callbacks[rd2CallbackConst.form.submitAll]=callback;
				return this;
			};
			this.callResetAll=function(callback){
				rd2._data.callbacks[rd2CallbackConst.form.resetAll]=callback;
				return this;
			};
			this.getSubmitData=function(){
	
				var getSendData={};
				var nameLength=$("#"+formId).find("*[name]").length;
	
				for(var u=0;u<nameLength;u++){
					var obj=$("#"+formId).find("*[name]").eq(u);
	
					var name=obj.attr("name");
	
					if(obj.attr("type")=="file"){
						_loadFiles(name,obj);
					}
					else if(obj.attr("type")=="radio"){
						var value=obj.val();
						var checked=obj.prop("checked");
						if(checked){
							getSendData[name]=value;
						}
					}
					else if(obj.attr("type")=="checkbox"){
						var value=obj.val();
						var checked=obj.prop("checked");
						var names=name.split(".");
						var name=names[0];
	
						if(checked){
							if(!getSendData[name]){
								getSendData[name]=[];
							}
							getSendData[name].push(value);
						}
					}
					else{
						var value=obj.val();
						getSendData[name]=value;
					}
				}
	
				function _loadFiles(name,obj){
	
					getSendData[name]=null;
	
					var prop=obj.prop("files");
	
					if(!prop.length){
						return;
					}
	
					for(var n=0;n<prop.length;n++){
						var file=obj.prop('files')[n];
						_files(file);
					}
	
					function _files(file){
	
						var reader=new FileReader();
						reader.onload=function(e){
		
							var buff=e.target.result;
		
							if(!getSendData[name]){
								getSendData[name]=[];
							}
		
							var result={
							  name:file.name,
							  size:file.size,
							  type:file.type,
							  modified:file.lastModifiedDate,
							  result:buff,
							};
		
							getSendData[name].push(result);
						}
						reader.readAsDataURL(file);
					}
				}
	
	
				return getSendData;
			};
		};

		return new _this(formId);

	},

	validateRule:{
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

	},
	validate:function(validateName){

		var _this=function(validateName){

			var _value=null;

			this.value=function(name){
				if(_value[name]){
					return _value[name];
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
	
						var jugement=true;
						if(rd2.validateRule[rule[0]]){
							jugement=rd2.validateRule[rule[0]](post[name],rule[1],rule[2],rule[3]);
						}
						else{
							if(rd2._data.callbacks["VALIDATE_CUSTOM_"+rule[0]]){
								jugement=rd2._data.callbacks["VALIDATE_CUSTOM_"+rule[0]](post[name],rule[1],rule[2],rule[3]);
							}
						}
	
						if(vrule.message){
							var message=vrule.message;
						}
						else{
							var message="validate error [field="+name+", rule="+rule[0];
							if(rule[1]){
								message+=", aregument1="+rule[1];
							}
							if(rule[2]){
								message+=", aregument1="+rule[2];
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

	},
	request:{
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
	},
	window:{
		none:function(params){

			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window_none">';
			
			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			if(params.callback){
				params.callback(obj);
			}

		},
		open:function(params){

			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			if(params.callback){
				params.callback(obj);
			}

		},
		alert:function(params){

			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			var button="Close";
			if(params.button){
				button=params.button;
			}
			windowHtml+='<div class="_control"><a>'+button+'</a></div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control a").on("click",function(){

				if(params.callback){
					params.callback(obj);
				}

			});
		},
		confirm:function(params){

			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			var buttonOk="OK";
			var buttonCancel="Cancel";
			if(params.button){
				if(params.button.ok){
					buttonOk=params.button.ok;
				}
				if(params.button.cancel){
					buttonCancel=params.button.cancel;
				}
			}
			windowHtml+='<div class="_control">';
			windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
			windowHtml+='<a id="ok">'+buttonOk+'</a>';
			windowHtml+='</div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control #ok").on("click",function(){

				if(params.callback){
					if(params.callback.ok){
						params.callback.ok(obj);
					}
				}

			});
			$("._wd ._window ._control #cancel").on("click",function(){

				if(params.callback){
					if(params.callback.cancel){
						params.callback.cancel(obj);
					}
				}

			});

		},
		image:function(params){

			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd _imageview '+classStr+'"><div class="_window">';

			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			windowHtml+='<img class="_image" src="'+params.image+'">';

			var button="Close";
			if(params.button){
				button=params.button;
			}
			windowHtml+='<div class="_control _center"><a>'+button+'</a></div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);
			
			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control a").on("click",function(){

				if(params.callback){
					params.callback(obj);
				}

			});
		},
		textInput:function(params){
			
			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';

			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			var type="text";
			if(params.type){
				type=params.type;
			}

			var placeHolder="";
			if(params.placeHolder){
				placeHolder=params.placeHolder;
			}

			windowHtml+='<div><input name="_input" type="'+type+'" placeholder="'+placeHolder+'"></div>';

			var buttonOk="OK";
			var buttonCancel="Cancel";
			if(params.button){
				if(params.button.ok){
					buttonOk=params.button.ok;
				}
				if(params.button.cancel){
					buttonCancel=params.button.cancel;
				}
			}
			windowHtml+='<div class="_control">';
			windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
			windowHtml+='<a id="ok">'+buttonOk+'</a>';
			windowHtml+='</div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control #ok").on("click",function(){

				obj.input=$("._wd input").val();

				if(params.callback){
					if(params.callback.ok){
						params.callback.ok(obj);
					}
				}

			});
			$("._wd ._window ._control #cancel").on("click",function(){

				obj.input=$("._wd input").val();

				if(params.callback){
					if(params.callback.cancel){
						params.callback.cancel(obj);
					}
				}
				
			});

		},
		scroll:function(params){
			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';

			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			var type="text";
			if(params.type){
				type=params.type;
			}

			var placeHolder="";
			if(params.placeHolder){
				placeHolder=params.placeHolder;
			}

			var scroll="";
			if(params.scroll){
				scroll=params.scroll;
			}
			windowHtml+='<div class="_scroll">'+scroll+'</div>';
			var buttonOk="OK";
			var buttonCancel="Cancel";
			if(params.button){
				if(params.button.ok){
					buttonOk=params.button.ok;
				}
				if(params.button.cancel){
					buttonCancel=params.button.cancel;
				}
			}
			windowHtml+='<div class="_control">';
			windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
			windowHtml+='<a id="ok">'+buttonOk+'</a>';
			windowHtml+='</div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);

			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control #ok").on("click",function(){

				if(params.callback){
					if(params.callback.ok){
						params.callback.ok(obj);
					}
				}

			});
			$("._wd ._window ._control #cancel").on("click",function(){

				if(params.callback){
					if(params.callback.cancel){
						params.callback.cancel(obj);
					}
				}
				
			});
		},
		notification:function(params){
			rd2._status.backbtn=true;

			var classStr="";
			if(params.class){
				classStr=params.class;
			}

			var windowHtml='<div class="_wd notification '+classStr+'"><div class="_window">';

			if(params.title){
				windowHtml+='<div class="_title">'+params.title+'</div>';
			}
			if(params.text){
				windowHtml+='<div class="_text">'+params.text+'</div>';
			}

			var button="Close";
			if(params.button){
				button=params.button;
			}
			windowHtml+='<div class="_control"><a>'+button+'</a></div>';
			windowHtml+='</div></div>';

			$("html").append(windowHtml);
			
			var obj={
				close:function(){

					$("._wd").addClass("closed");
					setTimeout(function(){
						$("._wd").remove();			
						rd2._status.backbtn=false;
					},500);

				},
			};

			$("._wd ._window ._control a").on("click",function(){

				if(params.callback){
					params.callback(obj);
				}

			});

		},
	},

	view:{
		open:function(viewName){
			if(rd2._data.viewCache[viewName]){
				return decodeURIComponent(escape(atob(rd2._data.viewCache[viewName])));
			}
		},
	},
};