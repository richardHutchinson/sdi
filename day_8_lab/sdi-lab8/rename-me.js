//var abcString = prompt("Please enter an email address.");
var abcString = "@@@";
//console.log(abcString);

function abc(abcString) {
	var atPosition = abcString.indexOf("@");
	var atCount = abcString.match(/@/g).length;
	
	console.log(atCount);
	
	if(atPosition > -1) {
			console.log("@ found");
	}else if(atCount > 1) {
		console.log("Please do not use multiple @ symbols.");
	}else {
		console.log("Please use a @ symbol");
	}
	
	//console.log(abcString.length);
	
	/*for(i = 0; i < abcString.length; i++) {
		console.log(abcString.length[i]);
	}*/
};

abc(abcString);
