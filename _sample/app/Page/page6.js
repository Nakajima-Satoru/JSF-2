rd2.page("page6").addGroup(["app"]).before(function(obj){
    setTitle("Dialog Sample Top");

    obj.pageObj.find(".dialog1").on("click",function(){

        rd2.dialog("dialog1").open(function(obj){
            setTimeout(function(){
                obj.close();
            },3000);
        });

    });

    // dialog2
    obj.pageObj.find(".dialog2").on("click",function(){

        rd2.dialog("dialog2").open();

    });

    // dialog3
    obj.pageObj.find(".dialog3").on("click",function(){

        // dialog3a
        rd2.dialog("dialog3").open(function(obj){

            obj.dialog.find(".dialog3a").on("click",function(){

                rd2.dialog("dialog3a").open();

            });

        });

    });

    // dialog4
    obj.pageObj.find(".dialog4").on("click",function(){

        rd2.dialog("dialog4").addClass("large-window").open(function(obj){

            obj.dialog.find(".dialog3a").on("click",function(){

                rd2.dialog("dialog3a").open();

            });

        });


    });
    
});