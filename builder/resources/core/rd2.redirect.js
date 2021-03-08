rd2.redirect={

	move:function(url,option){

		rd2.redirect.revertAnimation();
		
		rd2._data.redirectMode=rd2CallbackConst.redirectMode.move;

		$("pagelist").removeClass("back");

		if(!option){
			option={};
		}

		if(option.animation){
			if(option.animation=="null"){
				rd2.redirect.stopAnimation();
			}
			else{
				rd2.redirect.startAnimation();
				rd2.redirect.changeAnimation(option.animation);
			}
		}
			
		rd2._status.pageWait=false;

		history.pushState(null,null,null);

		var nowPageData=rd2.dataControl.getNowPage();

		if(nowPageData){
			nowPageData.html=$('pagelist page[data-pid="'+nowPageData.pageId+'"').html();
			nowPageData.scrollPosition={
				left:$('pagelist page[data-pid="'+nowPageData.pageId+'"').scrollLeft(),
				top:$('pagelist page[data-pid="'+nowPageData.pageId+'"').scrollTop(),
			};

		}

		var nextPageData=rd2.parse.url(url);

		nextPageData.moveOption=option;

		rd2._status.zindex++;
		nextPageData.index=rd2._status.zindex;

		if(!rd2.parse.urlDiffCheck(nowPageData,nextPageData)){
			return;
		}

		var html="";
		var pageUrlBase64 = btoa(nextPageData.url+".html");
		if(rd2._data.changerender[nextPageData.url]){
			pageUrlBase64 = btoa(rd2._data.changerender[nextPageData.url]+".html");
			console.log();
		}
		if(rd2._data.pageCache[pageUrlBase64]){
			html=decodeURIComponent(escape(atob(rd2._data.pageCache[pageUrlBase64])));
		}
		
		nextPageData.pageId=rd2.text.uniqId();

		/* callback before + leave */ 

		/* set call data */ 
		var callData={
			_exit:false,
			page:nextPageData.url,
			mode:"move",
			next:{
				url:nextPageData.url,
				request:nextPageData.request,
				pageId:nextPageData.pageId,	
			},
			exit:function(){
				this._exit=true;
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
			$("pagelist").append('<page data-pid="'+nextPageData.pageId+'" style="display:none"><div class="pagewk">'+html+'</div></page>');
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

					if(callData._exit){
						return;
					}
				}
			}

			/* load callback leave */ 
			if(rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url]){
				rd2._data.callbacks[rd2CallbackConst.page.leave+nowPageData.url](callData);
			}

			if(callData._exit){
				return;
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

				if(callData._exit){
					return;
				}
			}
		}

		/* load callback before */ 
		if(rd2._data.callbacks[rd2CallbackConst.page.before+nextPageData.url]){
			rd2._data.callbacks[rd2CallbackConst.page.before+nextPageData.url](callData);
		}
		
		if(callData._exit){
			return;
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

					// 入力値を保持するためのおまじない
					var getFormIds=closePage.find("form");
					if(getFormIds.length>0){
						for(var c=0;c<getFormIds.length;c++){
							var getFormId=getFormIds.eq(c).attr("id");
							var getFormData=rd2.form(getFormId).getSubmitData();
							if(!option.cacheClear){
								if(!rd2._data.redirectCache[rd2._data.redirectCache.length-1].formData){
									rd2._data.redirectCache[rd2._data.redirectCache.length-1].formData={};
								}
								rd2._data.redirectCache[rd2._data.redirectCache.length-1].formData[getFormId]=getFormData;
							}
						}	
					}

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
						rd2.redirect.startAnimation();
						rd2.redirect.revertAnimation();
					}
				},500);
			}
			else{
				if(option.animation){
					if(option.animation=="null"){
						rd2.redirect.startAnimation();
					}
				}
				rd2._status.chattaring=false;					
			}
				
			rd2.dataControl.redirectPush();
			rd2.dataControl.setNowPage(nextPageData);

			if(option.cacheClear){
				rd2.redirect.resetRedirectCache();
			}
		};

		if(!rd2._status.pageWait){
			afterCall();
		}

		if(option.cacheClear){
			rd2.redirect.resetRedirectCache();
		}

		return this;
	},
	back:function(option){
		
		rd2._data.redirectMode=rd2CallbackConst.redirectMode.back;

		rd2._status.pageWait=false;

		var nowPageData=rd2.dataControl.getNowPage();
		var backPageData=rd2._data.redirectCache.pop();
		
		if(!option){
			option={};
		}

		if(nowPageData.moveOption){
			option=nowPageData.moveOption;
		}

		if(option.animation){
			if(option.animation=="null"){
				rd2.redirect.stopAnimation();
			}
			else{
				rd2.redirect.startAnimation();
				rd2.redirect.changeAnimation(option.animation);
			}
		}

		if(!backPageData){
			return;
		}

		$("pagelist").prepend('<page data-pid="'+backPageData.pageId+'">'+backPageData.html+'</page>');
		var openPage=$("pagelist page[data-pid="+backPageData.pageId+"]");

		if(backPageData.formData){
			var formDataColum=Object.keys(backPageData.formData);
			for(var c=0;c<formDataColum.length;c++){
				var formId=formDataColum[c];
				var formData=backPageData.formData[formId];
				rd2.form(formId).setData(formData);
			}
		}

		if(backPageData.scrollPosition){
			openPage.scrollTop(backPageData.scrollPosition.top);
		}

		/* callback before + leave */ 

		/* set call data */ 
		var callData={
			mode:"back",
			pageObj:openPage,
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
/*
			$("pagelist").prepend('<page data-pid="'+backPageData.pageId+'">'+backPageData.html+'</page>');
			var openPage=$("pagelist page[data-pid="+backPageData.pageId+"]");
*/
			openPage.addClass("open").attr("style","z-index:"+backPageData.index);

			var afterMove=function(){

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
				if(option.animation){
					if(option.animation=="null"){
						rd2.redirect.startAnimation();
					}
				}
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
		$("pagelist").removeClass(rd2._status.changeAnimationName);
		$("pagelist").addClass(rd2._status.defaultAnimationName);
		rd2._status.changeAnimationName=null;
	},
	resetRedirectCache:function(){
		rd2._data.redirectCache=[];
	},
};