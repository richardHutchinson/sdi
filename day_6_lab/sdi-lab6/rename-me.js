var globalArray1 = ["B","A","C"];
var globalArray2 = ["Second letter","First letter","Third letter"];

function abc(globalArray1,globalArray2) {
	
	//last question: #8
	var pushD = "d";
	
	globalArray1.push(pushD);
	//console.log(globalArray1);
	
	var sortGlobalArray1 = globalArray1.sort();
	var sortGlobalArray2 = globalArray2.sort();
	
	for(var i = 0; i < globalArray1.length; i++) {
		console.log(globalArray1[i] + " " + globalArray2[i]);
	}
	
	return [globalArray1];
}

//abc(globalArray1,globalArray2);

//#8 continued - this runs the returned value ex: return pushD;
var consoleLogPushD = abc(globalArray1,globalArray2);
console.log(consoleLogPushD);
console.log(consoleLogPushD[0][3]);