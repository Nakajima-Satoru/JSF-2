rd2.form("test_form").callSubmit(function(obj){

	var vres=rd2.validate("test_form").verify(obj);

	rd2.validate("test_form").outputError(vres);

	if(!vres){

		alert("OK");
	}
//	console.log(obj);

	/**
	 * 
	 * testform Submit callback...
	 * 
	 */

});//