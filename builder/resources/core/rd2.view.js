rd2.view=function(viewName){

	var _this=function(viewName){

		this.open=function(){
			if(rd2._data.viewCache[viewName]){
				return decodeURIComponent(escape(atob(rd2._data.viewCache[viewName])));
			}
		};

	};

	return new _this(viewName);
};