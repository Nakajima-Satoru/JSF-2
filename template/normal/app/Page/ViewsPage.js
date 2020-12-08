rd2.page("views").before(function(obj){

    obj.pageObj.find("#open_sample1").on("click",function(){

        obj.pageObj.find("#output_sample1").html(rd2.view.open("sample1"));
        
    });

});