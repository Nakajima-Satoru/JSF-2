rd2.page("page7").before(function(obj){

    setTitle("Request Sample Top");

    obj.pageObj.find(".request1").on("click",function(){

        rd2.request("default").url("test01/").setData().send();
    });

    obj.pageObj.find(".request2").on("click",function(){
        alert("リクエストテスト2");
    });


});