class TestBigo {

    constructor() {
        this.startTime = null;
    }

    startTimer() {
        let date = new Date();

        this.startTime = date.getTime();
    }

    endTimer() {
        let date = new Date(),
            endTime = date.getTime(),
            diff = endTime - this.startTime;
        
        return diff;
    }

    test(func, timing, message) {
        const baseSetSize = 5000;
        let x, result, baseAverage, baseline, results = [];

        for(x = 1; x < 10; x += 1) {
            result = this.runTest(func, baseSetSize * x);

            if(x == 1) {
                baseAverage = result;
            }

            baseline = timing(x, baseAverage);

            results.push({
                average: result,
                amount: baseSetSize * x,
                baseline: baseline,
                diffPerc: this.getDiffPercentage(result, baseline)
            });
        }

        return results;
    }

    getDiffPercentage(result, baseline) {
        let base = (result / baseline) * 100;

        if(base > 100) {
            return base - 100;
        } else {
            return 100 - base;
        }
    }

    generateSet(amount) {
        let x, set = [];

        for(x = 0; x < amount; x++) {
            set.push(this.getRandomInt(0, 100));
        }

        return set;
    }

    /**
     * From http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    runTest(func, amount) {
        const runCount = 1000000;
        let x, endTime, average, set = this.generateSet(amount);

        this.startTimer();

        for(x = 0; x < runCount; x++) {
            func(set);
        }

        endTime = this.endTimer();
        average = endTime / runCount;

        return average;
    }

}

module.exports = TestBigo;