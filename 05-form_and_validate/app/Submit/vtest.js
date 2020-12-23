rd2.form("vtest").callSubmit(function(data){

	if(rd2.validate("vtest").verify(data)){
		return;
	}

	console.log(data);
	console.log("OK");
	
});