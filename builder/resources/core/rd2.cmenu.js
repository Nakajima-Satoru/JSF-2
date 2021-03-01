rd2.cmenu=function(cMenuName){

    var _this=function(cMenuName){

        this.open=function(option){

            if(!option){
                option={};
            }

            if(option.disable){
                rd2.redirect.disable(true);
            }
            if(!option.callback){
                option.callback={};
            }

            var cMenuId=rd2.text.uniqId();

            var cMenuNameBase64 = btoa(cMenuName+".html");
			if(!rd2._data.cmenuCache[cMenuNameBase64]){
                return;
            }
            var content=decodeURIComponent(escape(atob(rd2._data.cmenuCache[cMenuNameBase64])));

            var setClassName="";
            if(option.class){
                setClassName=option.class;
            }

            var setIdName="";
            if(option.id){
                setIdName=option.id;
            }

            var cMenuString='<div class="contextmenu '+setClassName+'" id="'+setIdName+'" data-cmenuid="'+cMenuId+'"><div class="window">'+content+'</div></div>';

            $("html").append(cMenuString);

            var target=$(".contextmenu[data-cmenuid="+cMenuId+"]");








            setTimeout(function(){

                $(".contextmenu[data-cmenuid="+cMenuId+"]").addClass("open");

                if(option.callback.open){
                    option.callback.open(obj);    
                }
                
            },50);

        };

    };

    return new _this(cMenuName);

};