(function(){
	//variables, output, confirms, prompts, and conditionals
	
	var stringVar = "abcd";
	var stringEscapeVar = "efgh. \n";
	var numberVar = 1234;
	var booleanTrue = true;
	var booleanFalse = false;
	
	console.log(stringVar + " " + stringEscapeVar + numberVar + " " + booleanTrue + " " + booleanFalse);
	
	//var alphabet = stringVar;
	var alphabet = prompt("First four letters in the alphabet are?");
	var alphabetConfirm = confirm("Are you sure " + alphabet + " is correct?");
	
	if(alphabet === stringVar && alphabetConfirm === true){
		console.log("Alphabet validation is good.");
		
		var numberTrue = parseInt(prompt("What is 1233 + 1 = ?"));
		var numberAdd = 1233 + 1;
		var numberTrueConfirm = confirm("Are you sure 1233 + 1 = " + numberTrue + "?");
		
		if(numberTrue === numberVar){
			console.log("NumberTrue is true " + numberTrue);
		}else{
			console.log("NumberTrue is false " + numberTrue);
		}
		
	}else{
		console.log("Alphabet was not good.");
		var alphabetReenter = prompt("Please re-enter the first four letters of the alphabet, though use abcd");
		var alphabetReenterConfirm = confirm("Press \"Ok\" if the next four letters in the alphabet are efgh.");
		
		if(alphabetReenter === stringVar && alphabetReenterConfirm === true){
			console.log("The next four letters in the alphabet are " + stringEscapeVar + "You choose " + alphabetReenterConfirm + "(\"Ok\") which is correct.");
		}else{
			console.log("The next four letters in the alphabet are " + stringEscapeVar + "You choose " + alphabetReenterConfirm + "(\"Cancel\") which is not correct.");
		}
	}
	
})();
