const fs=require("fs");

module.exports={
	fileExists:function(path){
		try{
			fs.statSync(path);
			return true;
		}catch(err){
			return false;
		}
	},
	search:function(path){

		var list={
			dir:[],
			file:[],
		};

		var _buff=fs.readdirSync(path);

		var bLength=_buff.length;
		for(var n=0;n<bLength;n++){
			var _path=_buff[n];

			var p=path+"/"+_path;

			if(fs.statSync(p).isDirectory()){
				list.dir.push(p);
				var addList=this.search(p);
				
				var dLength=addList.dir.length;
				var fLength=addList.file.length;
				for(var n2=0;n2<dLength;n2++){
					var d=addList.dir[n2];
					list.dir.push(d);
				}
				for(var n2=0;n2<fLength;n2++){
					var f=addList.file[n2];
					list.file.push(f);
				}
			}
			else{
				list.file.push(p);
			}
		}

		return list;

	},
	ccc:"ddd",
};