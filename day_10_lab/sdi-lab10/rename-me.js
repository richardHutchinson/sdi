var a = "";
var b = "";
var c = 0;
var i = 0;
var sum = 0;

// problem one
function sumData(a,b,c,i,sum) {
	
	while(i < 1000) {
		i++;
		
		//(i % 3 == 0) || (i % 5 == 0)
		if(i % 3 == 0) {
			c += i;
			console.log(i + " Three");
		};
		
		if(i % 5 == 0) {
			c += i;
			console.log(i + " Five");
		};
	}
};

sumData(a,b,c,i,sum);

// --

// problem two
function fourMil() {
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

fourMil();