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
        }).send();
        
        req.done(function(data){
            alert(data);
        }).error(function(err){
            alert(err);
        });

    });

    obj.pageObj.find(".request2").on("click",function(){

        var req=rd2.request("type_b").set({
            url:"test01.php",
            method:"post",
            data:{
                aaa:"bbbbbb",
                ccc:"dddd",
            },
        }).send();

        req.done(function(data){
            alert(data);
        }).error(function(err){
            alert(err);
        });

    });


});