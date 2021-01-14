rd2.dialog=function(dialogName){

    var _this=function(dialogName){

        this.open=function(callbacks){

            var dialogId=rd2.text.uniqId();

			if(!rd2._data.dialogCache["dialog_"+dialogName]){
                return;
            }
            var content=decodeURIComponent(escape(atob(rd2._data.dialogCache["dialog_"+dialogName])));
            
            var dialogString='<div class="dialogs" data-dialogid="'+dialogId+'"><div class="bg"></div><div class="window">'+content+'</div></div>';

            $("html").append(dialogString);

            setTimeout(function(){

                $(".dialogs[data-dialogid="+dialogId+"]").addClass("open");

                if(callbacks){
                    var obj={
                        id:dialogId,
                        close:function(){
                            $(".dialogs[data-dialogid="+dialogId+"]").removeClass("open");
                            setTimeout(function(){
                                $(".dialogs[data-dialogid="+dialogId+"]").remove();
                            },500);
                        },
                        dialog:$(".dialogs[data-dialogid="+dialogId+"]"),
                    };
                    callbacks(obj);    
                }
                
            },50);

        };

    };

    return new _this(dialogName);
};