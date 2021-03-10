rd2.formBuild={
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
				if(_name!="type"){
					optionStr+=" "+_name+'="'+_value+'"';
				}
			}

			var tagStr='<textarea name="'+name+'" '+optionStr+'>'+textareaValue+'</textarea>';

			return tagStr;	

		},
		select:function(name,option){

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
				if(_name!="type"){
					optionStr+=" "+_name+'="'+_value+'"'
				}
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

			option.select = radioSelect;
			option.value = radioValue;

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

			option.select = checkboxSelect;
			option.value = checkboxValue;

			return tagStr;
		},
	},
};