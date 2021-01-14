rd2.page("page6").addGroup(["app"]).before(function(obj){
    setTitle("Dialog Sample Top");

    obj.pageObj.find(".dialog1").on("click",function(){

        rd2.dialog("dialog1").open(function(obj){
            setTimeout(function(){
                obj.close();
            },3000);
        });

    });

    obj.pageObj.find(".dialog2").on("click",function(){

        rd2.dialog("dialog2").open(function(obj){

            obj.dialog.find(".closed").on("click",function(){
                obj.close();
            });

        });

    });

    obj.pageObj.find(".dialog3").on("click",function(){

        rd2.dialog("dialog3").open(function(obj){

            obj.dialog.find(".dialog3a").on("click",function(){

                rd2.dialog("dialog3a").open(function(obj2){

                    obj2.dialog.find(".closed").on("click",function(){
                        obj2.close();
                    });

                });

            });

            obj.dialog.find(".closed").on("click",function(){
                obj.close();
            });

        });

    });


});