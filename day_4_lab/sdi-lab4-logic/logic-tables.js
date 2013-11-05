//  NAME:  Enter your name here
//  DATE:  Enter the current date
// Scalable Data Infrastructures
// Day 4 Lab
//  Assignment 1
//  Using logical operators

var a = 0;
var p;
var q;
var r;

/*p = confirm("First value:  Click OK for true or Cancel for false.");
q = confirm("Second value:  Click OK for true or Cancel for false.");
r = confirm("Third value:  Click OK for true or Cancel for false.");*/

/*if (p && q) {
    console.log("With " + p + " and " + q + ", the outcome is TRUE.");
} else {
    console.log("With " + p + " and " + q + ", the outcome is FALSE.");
};*/

while(a < 8) {
	p = confirm("First value:  Click OK for true or Cancel for false.");
	q = confirm("Second value:  Click OK for true or Cancel for false.");
	r = confirm("Third value:  Click OK for true or Cancel for false.");
	
	if (p || (q || r)) {
	    console.log("With " + p + ", " + q + " and " + r + " the outcome is TRUE.");
	} else {
	    console.log("With " + p + ", " + q + " and " + r + " the outcome is FALSE.");
	};
	
	//console.log(p && (q || r));
	
	a++;

}