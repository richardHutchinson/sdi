// ----
	
// ----

// Declare all the Varibles
// Varibles in Problem Solving 1

var firstNum;
var secondNum;

// Varibles in Problem Solving 2

var strNum;

// Varibles in Problem Solving 3

var prD;
var poD;
var dT;


// Declare the Functions
// Function of Problem Solving 1

var formatNum = function (inputNum, deciNum) {

	return(inputNum.toFixed(deciNum));	
};

// Function of Problem Solving 2

var transNum = function (inputStr) {

	var conNum = parseFloat(inputStr);
	if (isNaN(conNum)){

		alert("You didn't enter a pure number.");
	} else {

		return conNum;
	};
};

// Function of Problem Solving 3

var compareTime = function (preDay, postDay, displayType) {

	var preDate = new Date (preDay);
	var postDate = new Date (postDay);
	var gap = postDate - preDate;

	if (displayType.toLowerCase() === "hours"){

		return ((gap/1000)/60)/60;
	} else if (displayType.toLowerCase() === "days"){

		return parseInt((((gap/1000)/60)/60)/24);
	};	
};

// Execute the functions
// Problem Solving 1 - Format a Number

alert("Start \"Problem Solving 1 - Format a Number\"");

firstNum = parseFloat(prompt("Type the number your want to be formatted with decimal places correction."));
secondNum = parseInt(prompt("Type how much decimal places you want"));

console.log ("Here is the result your request: " + formatNum(firstNum,secondNum));

// Problem Solving 2 - Number vs. String

alert("Start \"Problem Solving 2 - Number vs. String\"");

strNum = prompt("Type in your string number your want to convert.");

console.log("Your string is converted into number, you could tell the value type by the color of the number below.");
console.log(transNum(strNum));

// Problem Solving 3 - Date Differences

alert("Start \"Problem Solving 3 - Date Differences\"");

prD = prompt("Type in the earlier date.","MM/DD/YYYY");
poD = prompt("Type in the later date.","MM/DD/YYYY");
dT= prompt("Type in the type of time your want to see.", "Hours or Days" );

console.log ("The gap between these two days is " + compareTime (prD,poD,dT) + " " + dT.toLowerCase() + ".");