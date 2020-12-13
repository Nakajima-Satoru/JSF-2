rd2.redirect={

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

		if(option.cacheClear){
			rd2.redirect.resetRedirectCache();
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

		$("pagelist").prepend('<page data-pid="'+backPageData.pageId+'">'+backPageData.html+'</page>');
		var openPage=$("pagelist page[data-pid="+backPageData.pageId+"]");

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
/*
			$("pagelist").prepend('<page data-pid="'+backPageData.pageId+'">'+backPageData.html+'</page>');
			var openPage=$("pagelist page[data-pid="+backPageData.pageId+"]");
*/
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
		$("pagelist").removeClass(rd2._status.changeAnimationName);
		$("pagelist").addClass(rd2._status.defaultAnimationName);
		rd2._status.changeAnimationName=null;
	},
	resetRedirectCache:function(){
		rd2._data.redirectCache=[];
	},
};