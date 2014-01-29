var a = "";
var b = "";
var c = 0;
var i = 0;
var sum = 0;
var sum3 = 0;
var sum5 = 0;

// note: the first question's "or" means both

// problem one
/*function sumData(a,b,c,i,sum3,sum5) {
	
	while(i < 1000) {
		
		//(i % 3 == 0) || (i % 5 == 0)
		if(i % 3 == 0) {
			c += i;
			//console.log(c);
			sum3 += i;
			console.log(i + " Three");
		};
		
		if(i % 5 == 0) {
			c += i;
			sum5 += i;
			//console.log(i + " Five");
		};
		
		i++;
		
	}
	
	console.log(sum3 + ": 3 Total");
	console.log(sum5 + ": 5 Total");
	
};

sumData(a,b,c,i,sum3,sum5);*/

// --

// problem two
function fourMil(sum) {
	var a = 1;
	var b = 2;
	var c = "";
	
	for(i = 0; i < 10; i++) { //4000000
		var c = a + b;
		//console.log(c + " = c");
		//console.log(a + " = a");
		//console.log(b + " = b");
		//console.log(sum + " sum");

		if(sum + c < 10) { //4000000
			
			//console.log(c + " less c2");
			
			if(c % 2 == 0) { //rich note: things that go into the even number will equal 0, else they will equal 1 or the remainder
				sum += c;
				//console.log(sum + " sum's new value");
				//console.log(c + " less c");
				
				console.log(c + ": Even number element");
			}
		} else {
			break;
		}
		
		a = b;
		b = c;
	};
	
	console.log(sum + ": total");
};

fourMil(sum);