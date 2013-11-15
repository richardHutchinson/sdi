//console.log(alphabet);

function abcObjectConstructor(a,ab,abc) {
	console.log(abc);
	this.a = a;
	this.ab = ab;
	this.abc = abc;
	this.abcMethod = function() {
		this.abcdefg = true;
	};
	
	/*console.log(a);
	console.log(ab);
	console.log(abc);*/
	
};

function abcFunction() {
	for(var i = 0; i < alphabet.abc.length; i++) {
		var firstObject = "";
		var secondObject = "";
		
		/*for(var key in alphabet) {
			var test = alphabet[key][i]["A"];
			//console.log(alphabet[key][0]["A"]);
			//console.log(alphabet);
		}*/
		
		//note: this is checking the index - i = the 0 index in the json object array in the json.js file
		if(i == 0) {
			var firstObject = new abcObjectConstructor(alphabet.abc[i].A,alphabet.abc[i].AB,alphabet.abc[i].ABC);
			firstObject.abcMethod();
			
			console.log("firstObject, index = " + firstObject.a.length + ": " + firstObject.a,firstObject.ab,firstObject.abcdefg);
			//console.log(firstObject);
		}else{
			var secondObject = new abcObjectConstructor(alphabet.abc[i].A,alphabet.abc[i].AB,alphabet.abc[i].ABC);
			
			//note: these are the other two objects in the json.js file
			console.log("secondObject, index = " + secondObject.a.length + ": " + secondObject.a,secondObject.ab,secondObject.abc);
		}
	};
	//console.log(test);
};

abcFunction();

//class example1
/*for(var i = 0; i < x.car.length; i++) {
	//console.log(x.car[i].make);
		
	for(var key in x.car[i]) {
		console.log(key + " is " + x.car[i][key]);
	}
};

// ----

//class example2
/*var objContructor = function(carMake, carModel, carYear) {
	this.make = carMake;
	this.model = carModel;
	this.year = carYear;
	this.myMethod = function() { //It should also include some methods that can act upon the object.
		this.sold = true;
	};
};

for(var i = 0; i < jsonData.cars.length; i++) { //note: jsonData is the json variable in the json javascript page
	var firstCarObj;
	var secondCarObj;
	
	if(i == 0) {
		firstCarObj = new objContructor(jsonData.cars[i].make, jsonData.cars[i].module, jsonData.cars[i].year);
	}else {
		secondCarObj = new objContructor(jsonData.cars[i].make, jsonData.cars[i].module, jsonData.cars[i].year);
	}
};*/

//class example2
//console.log(firstCarObj.make);
//console.log(secondCarObj.make);