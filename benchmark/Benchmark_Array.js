function StandardBenchmark(toMeasure, repeatTimes){
    if(typeof(repeatTimes) != "number"){
        repeatTimes = 1;
    }
    if(typeof(toMeasure) === "function"){
        var total_taken = 0;
        for(var i = 0; i < repeatTimes; i++){
            var startTimeSubtask = performance.now();
            toMeasure.call();
            var endTimeSubtask = performance.now();
            total_taken += (endTimeSubtask - startTimeSubtask);
        }
    }
    return {result : total_taken / repeatTimes};
}



//Params Config
var TimesToBeExecuted = 10;
var ArraySize = 100000000;

var TaskGenericArrayExecuted = function(){
    var genericArrayTest = new Array(ArraySize);
    for(var i=0; i<ArraySize; i++)
        genericArrayTest[i]=i%2;
};

var TaskTypedArrayExecuted = function(){
    var typedArrayTest = new Int8Array(ArraySize);
    for(var i=0; i<ArraySize; i++)
        typedArrayTest[i]=i%2;
};

var GenericArrayTestResult = new StandardBenchmark(TaskGenericArrayExecuted, TimesToBeExecuted);
console.log("Generic Array Execution Time " + GenericArrayTestResult.result + "ms");

var TypedArrayTestResult = new StandardBenchmark(TaskTypedArrayExecuted, TimesToBeExecuted);
console.log("Typed Array Execution Time " + TypedArrayTestResult.result+ "ms");