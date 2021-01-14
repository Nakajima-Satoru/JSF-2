rd2.form("form2").callSubmit(function(data){

    try{
    var vres=rd2.validate("form2").verify(data);

}catch(err){
    console.log(err);
}

    if(vres){
        return;
    }

    console.log(data);

});