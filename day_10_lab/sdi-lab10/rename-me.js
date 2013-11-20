var a = "";
var b = "";
var c = 0;
var i = 0;
var sum = 0;
var sum3 = 0;
var sum5 = 0;

// note: the first question's "or" means both

// problem one
function sumData(a,b,c,i,sum3,sum5) {
	
	while(i < 1000) {
		i++;
		
		//(i % 3 == 0) || (i % 5 == 0)
		if(i % 3 == 0) {
			c += i;
			sum3 += i;
			console.log(i + " Three");
		};
		
		if(i % 5 == 0) {
			c += i;
			sum5 += i;
			//console.log(i + " Five");
		};
	}
	
	console.log(sum3 + ": 3 Total");
	console.log(sum5 + ": 5 Total");
	
};

sumData(a,b,c,i,sum3,sum5);

// --

// problem two
function fourMil(sum) {
	var a = 1;
	var b = 2;
	var c = "";
	
	for(i = 0; i < 4000000; i++) {
		var c = a + b;

		if(c < 4000000) {
			if(c % 2 == 0) {
				sum += c;
				console.log(c + ": Even number element");
			}
		}
		
		a = b;
		b = c;
	};
	
	console.log(sum + ": total");
};

fourMil(sum);