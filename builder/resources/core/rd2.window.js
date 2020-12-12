rd2.window={

	none:function(params){

		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window_none">';
			
		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);

			},
		};

		if(params.callback){
			params.callback(obj);
		}

	},
	open:function(params){

		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);

			},
		};

		if(params.callback){
			params.callback(obj);
		}

	},
	alert:function(params){

		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		var button="Close";
		if(params.button){
			button=params.button;
		}
		windowHtml+='<div class="_control"><a>'+button+'</a></div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);
			},
		};

		$("._wd ._window ._control a").on("click",function(){

			if(params.callback){
				params.callback(obj);
			}
		});
	},
	confirm:function(params){

		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';
		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		var buttonOk="OK";
		var buttonCancel="Cancel";
		if(params.button){
			if(params.button.ok){
				buttonOk=params.button.ok;
			}
			if(params.button.cancel){
				buttonCancel=params.button.cancel;
			}
		}
		windowHtml+='<div class="_control">';
		windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
		windowHtml+='<a id="ok">'+buttonOk+'</a>';
		windowHtml+='</div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);
			},
		};

		$("._wd ._window ._control #ok").on("click",function(){

			if(params.callback){
				if(params.callback.ok){
					params.callback.ok(obj);
				}
			}

		});
		$("._wd ._window ._control #cancel").on("click",function(){

			if(params.callback){
				if(params.callback.cancel){
					params.callback.cancel(obj);
				}
			}

		});
	},
	image:function(params){

		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd _imageview '+classStr+'"><div class="_window">';

		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		windowHtml+='<img class="_image" src="'+params.image+'">';

		var button="Close";
		if(params.button){
			button=params.button;
		}
		windowHtml+='<div class="_control _center"><a>'+button+'</a></div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);
			
		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();
					rd2._status.backbtn=false;
				},500);

			},
		};

		$("._wd ._window ._control a").on("click",function(){

			if(params.callback){
				params.callback(obj);
			}

		});
	},
	textInput:function(params){
			
		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';

		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		var type="text";
		if(params.type){
			type=params.type;
		}

		var placeHolder="";
		if(params.placeHolder){
			placeHolder=params.placeHolder;
		}

		windowHtml+='<div><input name="_input" type="'+type+'" placeholder="'+placeHolder+'"></div>';

		var buttonOk="OK";
		var buttonCancel="Cancel";
		if(params.button){
			if(params.button.ok){
				buttonOk=params.button.ok;
			}
			if(params.button.cancel){
				buttonCancel=params.button.cancel;
			}
		}
		windowHtml+='<div class="_control">';
		windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
		windowHtml+='<a id="ok">'+buttonOk+'</a>';
		windowHtml+='</div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);

			},
		};

		$("._wd ._window ._control #ok").on("click",function(){

			obj.input=$("._wd input").val();

			if(params.callback){
				if(params.callback.ok){
					params.callback.ok(obj);
				}
			}

		});
		$("._wd ._window ._control #cancel").on("click",function(){

			obj.input=$("._wd input").val();

			if(params.callback){
				if(params.callback.cancel){
					params.callback.cancel(obj);
				}
			}
				
		});
	},
	scroll:function(params){
		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd '+classStr+'"><div class="_window">';

		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		var type="text";
		if(params.type){
			type=params.type;
		}

		var placeHolder="";
		if(params.placeHolder){
			placeHolder=params.placeHolder;
		}

		var scroll="";
		if(params.scroll){
			scroll=params.scroll;
		}
		windowHtml+='<div class="_scroll">'+scroll+'</div>';
		var buttonOk="OK";
		var buttonCancel="Cancel";
		if(params.button){
			if(params.button.ok){
				buttonOk=params.button.ok;
			}
			if(params.button.cancel){
				buttonCancel=params.button.cancel;
			}
		}
		windowHtml+='<div class="_control">';
		windowHtml+='<a id="cancel">'+buttonCancel+'</a>';
		windowHtml+='<a id="ok">'+buttonOk+'</a>';
		windowHtml+='</div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);

		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);

			},
		};

		$("._wd ._window ._control #ok").on("click",function(){

			if(params.callback){
				if(params.callback.ok){
					params.callback.ok(obj);
				}
			}

		});
		$("._wd ._window ._control #cancel").on("click",function(){

			if(params.callback){
				if(params.callback.cancel){
					params.callback.cancel(obj);
				}
			}
				
		});
	},
	notification:function(params){
		rd2._status.backbtn=true;

		var classStr="";
		if(params.class){
			classStr=params.class;
		}

		var windowHtml='<div class="_wd notification '+classStr+'"><div class="_window">';

		if(params.title){
			windowHtml+='<div class="_title">'+params.title+'</div>';
		}
		if(params.text){
			windowHtml+='<div class="_text">'+params.text+'</div>';
		}

		var button="Close";
		if(params.button){
			button=params.button;
		}
		windowHtml+='<div class="_control"><a>'+button+'</a></div>';
		windowHtml+='</div></div>';

		$("html").append(windowHtml);
			
		var obj={
			close:function(){

				$("._wd").addClass("closed");
				setTimeout(function(){
					$("._wd").remove();			
					rd2._status.backbtn=false;
				},500);

			},
		};

		$("._wd ._window ._control a").on("click",function(){

			if(params.callback){
				params.callback(obj);
			}

		});

	},
};