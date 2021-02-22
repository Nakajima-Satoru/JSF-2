rd2.view=function(viewName){

	var _this=function(viewName){

		this.open=function(){

			var viewNameBase664=btoa(viewName+".html");

			if(rd2._data.viewCache[viewNameBase664]){
				return decodeURIComponent(escape(atob(rd2._data.viewCache[viewNameBase664])));
			}
		};

	};

	return new _this(viewName);
};