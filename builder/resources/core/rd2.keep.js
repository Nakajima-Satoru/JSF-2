rd2.keep=function(keepName){

	var _this=function(keepName){

		this.set=function(data){
			rd2._data.keepData[keepName]=data;
		};

		this.get=function(data){
			if(rd2._data.keepData[keepName]){
				return rd2._data.keepData[keepName];
			}
		};

		this.delete=function(){
			delete rd2._data.keepData[keepName];
		};
		
	};

	return new _this(keepName);
};