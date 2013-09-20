var alphabet = {
	"abc":[
		{ //index 0
			"A":"a",
			"AB":"CD",
			"ABC":"abc"
		},
		{ //index 1
			"A":"ab",
			"AB":"cd",
			"ABC":"aBc"
		},
		{ //index 2
			"A":"abc",
			"AB":"cD",
			"ABC":"abC"
		}
	]
};

var x = {
	"car":[
		{
			"make":"Ford",
			"model":"Failane"
		},
		{
			"make":"Buick",
			"model":"Electra"
		}
	]
};

//another object type
/*var x = {
	y:"Y",
	Z:"Z"
};*/

//mutator and accessor methods
/*var x = {
	make:"Buick",
	model:"Electra",
	sellCar: function() { //mutator/setter method
		this.sold = true;
	},
	getCarStatus: function() { //accessor/getter method
		return this.sold;
	}
};
x.sellCar();*/
//console.log(x.getCarStatus());
//console.log(x.sold);

//console.log(x.car[0].make);

//console.log(alphabet);