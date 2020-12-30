rd2.form=function(formId){

	var _this=function(formId){

		this.set=function(option,option2nd){

			if(rd2._data.redirectMode == rd2CallbackConst.redirectMode.back){
				if(option2nd){
					if(!option2nd.useBack){
						console.log("aaaa...");
						return;
					}
				}
				else{
					return;
				}
			}
			
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

			var content=rd2.view(viewName).open();		
			$("form#"+formId+" [field="+fieldName+"]").append('<div index="'+index+'">'+content+'</div>');
			this.set(option,{
				useBack:true,
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

				var nameObj=obj.find('[name="'+name+'"]');

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
};
