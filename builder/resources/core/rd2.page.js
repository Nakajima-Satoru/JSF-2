rd2.page=function(pageName){

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

			if(typeof groupList=="string"){
				groupList=[groupList];
			}

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
};
