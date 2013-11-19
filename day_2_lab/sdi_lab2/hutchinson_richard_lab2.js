//alert("JavaScript works!");

(function(){
	/*
		String
		String with escapes
		Number
		Boolean
	*/
	
	var string = "abcd ";
	var stringEscapes = "efgh \n";
	var varNumber = 1234;
	var varBooleanTrue = true;
	var varBooleanFalse = false;
	
	console.log(string + stringEscapes + varNumber + varBooleanTrue + varBooleanFalse);
	
	var confirmBox = confirm(varBooleanTrue);
	console.log(confirmBox);
	
	var varNumber = parseInt(prompt(varNumber));
	console.log(varNumber);
	
	//rich note: these conditions are not required
	if(isNaN(varNumber)){
		console.log(varNumber + " not a number");
	}else{
		console.log(varNumber + " is a number");
	}
})();