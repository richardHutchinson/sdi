//var abcString = prompt("Please enter an email address.");
var abcString = "@ @ @".trim();
var whiteSpace1 = abcString.replace(/ /g,"");

console.log(whiteSpace1);

// ----

/*var test = abcString.indexOf(" ");
console.log(test + " test");*/

// ----

function abc(abcString) {
	var atPosition = abcString.indexOf("@");
	var atCount = abcString.match(/@/g).length;
	
	//console.log(atCount);
	
	if(atPosition > -1) {
		console.log("@ found");
	}else if(atCount > 1) {
		console.log("Please do not use multiple @ symbols.");
	}else {
		console.log("Please use a @ symbol");
	}
};

/*var a = "a,b,c";
var b = ",";
var c = "/";

function abcStrings(a,b,c) {
	var abcRegExp = new RegExp(b,"g");
	var abcReplace = a.replace(abcRegExp,c);
	
	console.log(abcReplace);
};

for(i=0; i<a.length; i++) {
	var abcReplace = a.replace(b,c);
	console.log(abcReplace);
}

abc(abcString);
abcStrings(a,b,c);*/

// --

//date functionality
/*var myDate = new Date("11/1/2014");
var secondDate = new Date("11/2/2014");

var a = secondDate - myDate;
console.log(a);
var newDate = ((((secondDate - myDate)/1000)/60)/60);
console.log(newDate);
*/

// --


var a = "a,b,c";
var b = ",";
var c = "/";

function abcStrings(a,b,c) {
	var abcSplit = a.split(b);
	var abcNew = "";
	
	//console.log(abcSplit);
	
	for(var i = 0; i < abcSplit.length; i++) {
		
		if(abcNew === "") {
			abcNew = abcNew + abcSplit[i];
		}else {
			abcNew = abcNew + c + abcSplit[i];
		}
		
		//console.log(abcNew); //this is the returned loop results
	};
	
	console.log(abcNew);
	
	//console.log(abcSplit);
};

abcStrings(a,b,c);