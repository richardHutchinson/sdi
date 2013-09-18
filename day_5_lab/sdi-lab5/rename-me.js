var enterXPrompt = "";
var enterYPrompt = "";
var enterOperatorPrompt = "";

var enterXPrompt = parseInt(prompt("Please enter a number for X"));
var enterYPrompt = parseInt(prompt("Please enter a number for Y"));
var enterOperatorPrompt = prompt("Please enter a operator, ex: /, *, -, +");

/*console.log(enterXPrompt);
console.log(enterYPrompt);
console.log(enterOperatorPrompt);*/

if(isNaN(enterXPrompt)) {
	console.log(enterXPrompt + " is not a number. Please enter a number");
}else if(isNaN(enterYPrompt)) {
	console.log(enterYPrompt + " is not a number. Please enter a number");
}else {
	console.log("The equation is: " + enterXPrompt + enterOperatorPrompt + enterYPrompt);
}

if(enterOperatorPrompt === "/") {
	console.log("Operator: " + enterOperatorPrompt + " was entered");
}else if(enterOperatorPrompt === "*") {
	console.log("Operator: " + enterOperatorPrompt + " was entered");
}else if(enterOperatorPrompt === "-") {
	console.log("Operator: " + enterOperatorPrompt + " was entered");
}else if(enterOperatorPrompt === "+") {
	console.log("Operator: " + enterOperatorPrompt + " was entered");
}else {
	console.log("Invalid operator: " + enterOperatorPrompt);
}

function division(enterXPrompt,enterOperatorPrompt,enterYPrompt) {
	if(enterOperatorPrompt === "/") {
		console.log(enterXPrompt / enterYPrompt);
	}
}

function multiplication(enterXPrompt,enterOperatorPrompt,enterYPrompt) {
	if(enterOperatorPrompt == "*") {
		console.log(enterXPrompt * enterYPrompt);
	}
}

function subtraction(enterXPrompt,enterOperatorPrompt,enterYPrompt) {
	if(enterOperatorPrompt == "-") {
		console.log(enterXPrompt - enterYPrompt);
	}
}

function addition(enterXPrompt,enterOperatorPrompt,enterYPrompt) {
	if(enterOperatorPrompt == "+") {
		console.log(enterXPrompt + enterYPrompt);
	}
}

division(enterXPrompt,enterOperatorPrompt,enterYPrompt);
multiplication(enterXPrompt,enterOperatorPrompt,enterYPrompt);
subtraction(enterXPrompt,enterOperatorPrompt,enterYPrompt);
addition(enterXPrompt,enterOperatorPrompt,enterYPrompt);