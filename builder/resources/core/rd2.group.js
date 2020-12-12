rd2.group=function(groupName){

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
};
