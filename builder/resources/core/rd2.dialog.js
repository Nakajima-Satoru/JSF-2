
rd2.dialogClose=function(){
    console.log("dialog close");
    $(".dialogs").removeClass("open");
    $(".dialogs").remove();
};
rd2.dialog=function(dialogName){

    var _this=function(dialogName){

        var setClassName="";

        this.open=function(callbacks){

            var dialogId=rd2.text.uniqId();

			if(!rd2._data.dialogCache["dialog_"+dialogName]){
                return;
            }
            var content=decodeURIComponent(escape(atob(rd2._data.dialogCache["dialog_"+dialogName])));
            
            var dialogString='<div class="dialogs '+setClassName+'" data-dialogid="'+dialogId+'"><div class="bg"></div><div class="window">'+content+'</div></div>';

            setClassName=null;

            $("html").append(dialogString);

            $(".dialogs[data-dialogid="+dialogId+"]").find(".closed").on("click",function(){
                $(".dialogs[data-dialogid="+dialogId+"]").removeClass("open").remove();    
            });

            var obj={
                id:dialogId,
                close:function(){
                    $(".dialogs[data-dialogid="+dialogId+"]").removeClass("open").remove();
                },
                dialog:$(".dialogs[data-dialogid="+dialogId+"]"),
            };

            setTimeout(function(){

                $(".dialogs[data-dialogid="+dialogId+"]").addClass("open");

                if(callbacks){
                    callbacks(obj);    
                }
                
            },50);

           return obj;
        };

        this.addClass=function(className){
            setClassName=className;
            return this;
        };

    };

    return new _this(dialogName);
};