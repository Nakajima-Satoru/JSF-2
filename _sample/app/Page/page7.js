rd2.page("page7").before(function(obj){

    setTitle("Request Sample Top");

    obj.pageObj.find(".request1").on("click",function(){

        var req=rd2.request("type_a").set({
            url:"test01.php",
            method:"post",
            data:{
                aaa:"bbbbbb",
                ccc:"dddd",
            },
            callbacks:{
                before:function(cond){

                    console.log("ajax before...");
                    cond.headers.user="usernames";

                },
                beforeSend:function(){

                    console.log("ajax before send...");
                },
            },
        }).send();
        
        req.done(function(data){
            alert(data);
            console.log(data);
        }).error(function(err){
            alert("ERROR!!");
            throw(err);
        });

    });

    obj.pageObj.find(".request2").on("click",function(){

        var req=rd2.request("type_b").url("test01.php").send();
        
        req.done(function(data){
            alert(data);
        }).error(function(err){
            alert("ERROR!!");
            throw(err);
        });

    });


});