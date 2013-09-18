var globalArray1 = ["B","A","C"];
var globalArray2 = ["Second letter","First letter","Third letter"];

function abc(globalArray1,globalArray2) {
	var sortGlobalArray1 = globalArray1.sort();
	var sortGlobalArray2 = globalArray2.sort();
	
	for(var i = 0; i < globalArray1.length; i++) {
		console.log(globalArray1[i] + " " + globalArray2[i]);
	}
}

abc(globalArray1,globalArray2);
