//  NAME:  Enter your name
//  DATE:  Enter the current date
// Scalable Data Infrastructures
//  Day 4 Lab
//  Assignment 2
//  Find and fix the errors

var myName = "John Doe";
var my Job  = "\"Cat Wrangler\"";
var myRate = 7.50;
var numOfCats = 40;
var employed = true;

console.log("Hello!  My name is " + myName ".");
console.log("I'm a " + myJob + ".");
console.log("My current assignment has me wrangling " + numOfCats + " cats.");
console.log("So, let's get to work!");

while (numOfCats > 0) {
    
    if (employed = true) {
        
        console.log("I've wrangled another cat.  Only " + numofcats + " left!");
        
    } else {
        
        console.log("I've been fired!  Someone else will have to wrangle the rest!");
        
    };
    
    numOfCats--;
    
    if (numOfCats === 5) {
        
        employed = false;
        
    };
    
};

