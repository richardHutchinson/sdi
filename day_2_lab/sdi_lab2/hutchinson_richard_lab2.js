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
	
	
	/*var confirmBox = confirm(varBooleanTrue);
	console.log(confirmBox);*/
	
	var promptBox = parseInt(prompt(varNumber));
	console.log(promptBox);
	
	if(isNaN(promptBox)){
		console.log("not a number");
	}
})();