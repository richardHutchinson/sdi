var a = 50;
var b = 1;


var c = "5";
var d = "03/26/1988";
var e = "02/25/1988";
//var f = "hours"; //hours or days
var f = "days"; //days or days

var functionAb = function ab(a,b) {
	var numberToDecimal = a.toFixed(b);
	
	//console.log(numberToDecimal);
	
	return numberToDecimal;
};

var functionC = function c(c) {
	var stringToNumber = parseFloat(c);
	
	//return stringToNumber;
};

var functionDef = function(d,e,f) {
	var test1 = new Date(d);
	var test2 = new Date(e);
	var dateDifference = test1 - test2;
	
	//console.log(dateDifference);
	//console.log((dateDifference/1000)/60)/60;
	//console.log(dateDifference);
	
	if(f === "hours") {
		return ((dateDifference/1000)/60)/60;
	}else if(f === "days") {
		return (((dateDifference/1000)/60)/60)/24;
	}
};

var returnedValueAb = functionAb(a,b);
var returnedValueC = functionC(c);
var returnedValueDef = functionDef(d,e,f);

//console.log(returnedValueAb);
//console.log(returnedValueC);
console.log(returnedValueDef);