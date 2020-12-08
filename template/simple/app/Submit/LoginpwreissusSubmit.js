rd2.form("loginpwreissus").callSubmit(function(data){

	var vres=rd2.validate("loginpwreissus").verify(data);

	rd2.validate("loginpwreissus").outputError(vres);

	if(vres){
		return;
	}

	
});