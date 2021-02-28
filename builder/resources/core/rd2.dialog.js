
rd2.dialogClose=function(){
    console.log("dialog close");
    $(".dialogs").removeClass("open");
    $(".dialogs").remove();
};
rd2.dialog=function(dialogName){

    var _this=function(dialogName){

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

            var dialogId=rd2.text.uniqId();

            dialogNameBase64 = btoa(dialogName+".html");
			if(!rd2._data.dialogCache[dialogNameBase64]){
                return;
            }
            var content=decodeURIComponent(escape(atob(rd2._data.dialogCache[dialogNameBase64])));

            var setClassName="";
            if(option.class){
                setClassName=option.class;
            }

            var setIdName="";
            if(option.id){
                setIdName=option.id;
            }

            var dialogString='<div class="dialogs '+setClassName+'" id="'+setIdName+'" data-dialogid="'+dialogId+'"><div class="bg"></div><div class="window">'+content+'</div></div>';

            $("html").append(dialogString);

            var obj={
                id:dialogId,
                close:function(){
                    if(option.disable){
                        rd2.redirect.disable(false);
                    }
                    if(option.callback.close){
                        option.callback.close(obj);
                    }
                    $(".dialogs[data-dialogid="+dialogId+"]").removeClass("open").addClass("closed");

                    setTimeout(function(){
                        $(".dialogs[data-dialogid="+dialogId+"]").removeClass("closed").remove();
                    },300);   

                },
                dialog:$(".dialogs[data-dialogid="+dialogId+"]"),
            };


            $(".dialogs[data-dialogid="+dialogId+"]").find(".closed").on("click",function(){
                if(option.disable){
                    rd2.redirect.disable(false);
                }
                if(option.callback.close){
                    option.callback.close(obj);
                }
                $(".dialogs[data-dialogid="+dialogId+"]").removeClass("open").addClass("closed");

                setTimeout(function(){
                    $(".dialogs[data-dialogid="+dialogId+"]").removeClass("closed").remove();
                },300);   

                if($(this).attr("url")){
                    var url=$(this).attr("url");
                    rd2.redirect.move(url);
                }
            });


            setTimeout(function(){

                $(".dialogs[data-dialogid="+dialogId+"]").addClass("open");

                if(option.callback.open){
                    option.callback.open(obj);    
                }
                
            },50);

           return obj;
        };

    };

    return new _this(dialogName);
};