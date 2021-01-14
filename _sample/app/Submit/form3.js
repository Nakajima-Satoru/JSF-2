rd2.form("form3").callSubmit(function(data){

	var vres=rd2.validate("form3").verify(data);
	
    if(vres){
        return;
    }

	console.log(data);
	
});