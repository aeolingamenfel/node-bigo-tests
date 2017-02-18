const TestBigo = require("./../TestBigo.js");

let tester = new TestBigo();

let x, validSum = 0.0, validAverage, result, results = tester.test((set) => {
    let x;

    for(x = 0; x < set.length; x++) {
        set[x] += 1;
    }

    return set;
}, (x, base) => {
    return x * base;   
}, null);

for(x = 0; x < results.length; x++) {
    result = results[x];

    validSum += result.diffPerc;
}

validAverage = validSum / results.length;

console.log(results);
console.log((validAverage <= 5.0) ? 'Success!' : 'Failure.');
console.log("Deviation Average: " + validAverage + "%");