/* 1. Least,Greatest,Mean,Sum,Product
 * 2. Factorial Calculator
 * 3. Fizz Buzz
 * 4. Palindrome Detector
 * 6. Sum of all fears.
 * 7. API Interaction
 */



/*============ Exercise One, Least,Greatest,Mean,Sum,Product Calculator=================*/
document.getElementById("exerciseOneCalculateButton").addEventListener("click", exerciseOne);
document.getElementById("exerciseOneGenerateButton").addEventListener("click", GenerateNumbers);
const exerciseOneInputs = [document.getElementById("exerciseOneInputOne"), document.getElementById("exerciseOneInputTwo"), document.getElementById("exerciseOneInputThree"),
document.getElementById("exerciseOneInputFour"), document.getElementById("exerciseOneInputFive")]
const exerciseOneOutputs = [document.getElementById("exerciseOneOutputOne"), document.getElementById("exerciseOneOutputTwo"), document.getElementById("exerciseOneOutputThree"),
document.getElementById("exerciseOneOutputFour"),document.getElementById("exerciseOneOutputFive")]
function exerciseOne() {
    var inputs = [parseInt(exerciseOneInputs[0].value), parseInt(exerciseOneInputs[1].value),
        parseInt(exerciseOneInputs[2].value), parseInt(exerciseOneInputs[3].value), parseInt(exerciseOneInputs[4].value)];
    inputs.sort(function (a, b) { return a - b });
    var mean = calculateMean(inputs)
    var total = calculateTotal(inputs)
    var product = calculateProduct(inputs)
    exerciseOneOutputs[0].value = "Least [" + inputs[0] + "]";
    exerciseOneOutputs[1].value = "Greatest [" + inputs[inputs.length - 1] + "]";
    exerciseOneOutputs[2].value = "Mean [" + mean + "]";
    exerciseOneOutputs[3].value = "Total [" + total + "]";
    exerciseOneOutputs[4].value = "Product [" + product + "]";
}
function GenerateNumbers() {
    for (i = 0; i < 5; i++) {
        exerciseOneInputs[i].value = Math.floor(Math.random() * 100) + 1;
    }
}
function calculateMean(numbers) {
    var result = calculateTotal(numbers);
    result = result / numbers.length;
    return result;
}
function calculateTotal(numbers) {
    var result = 0;
    for (i = 0; i < numbers.length; i++) {
        result = numbers[i] + result;
    }
    return result;
}
function calculateProduct(numbers) {
    var result = 1;
    for (i = 0; i < numbers.length; i++) {
        result = numbers[i] * result;
    }
    return result;
}
/* =======================================================================================*/


/*========================= Exercise Two, Factorial Calculator ===========================*/
const exerciseTwoInput = document.getElementById("exerciseTwoInput");
const exerciseTwoOutput = document.getElementById("exerciseTwoOutput");
document.getElementById("exerciseTwoCalculate").addEventListener("click", exerciseTwo)
function exerciseTwo() {
    var startingNumber = exerciseTwoInput.value;
    var total = 1
    var string = ""
    for (i = startingNumber; i > 0; i--) {
        string = string + i + "*"
        total = total * i;
    }
    var string = string.substring(0, string.length - 1);
    var string = string + "=" + total;
    exerciseTwoOutput.value = string;

}
/*=========================================================================================*/


/*========================= Exercise Three, Fizz/Buzz ============================*/
const exerciseThreeInputOne = document.getElementById("exerciseThreeInputOne");
const exerciseThreeInputTwo = document.getElementById("exerciseThreeInputTwo");
const exerciseThreeOutput = document.getElementById("exerciseThreeOutput");
document.getElementById("exerciseThreeCalculate").addEventListener("click", exerciseThree)
window.addEventListener("load", exerciseThree)
function exerciseThree() {
    exerciseThreeOutput.innerHTML = ""
    var rows = []
    var inputOne = exerciseThreeInputOne.value;
    var inputTwo = exerciseThreeInputTwo.value;
    for (i = 0; i < 10; i++) {
        exerciseThreeOutput.i
        exerciseThreeOutput.insertAdjacentHTML("beforeend", "<row id='exerciseThreeOutputRow" + i + "'> </row>")
        rows[i] = document.getElementById("exerciseThreeOutputRow" + i)
    }
    var text = "<p>"
    for (i = 1; i < 101; i++) {
        if (i % inputOne == 0 && i % inputTwo == 0) { text = text +"<span class='text-primary'>FizzBuzz</span>, " }
        else if (i % inputTwo == 0) { text = text +"<span class='text-success'>Buzz</span>, " }
        else if (i % inputOne == 0) { text = text +"<span class='text-danger'>Fizz</span>, " }
        else { text = text + "<span class='text-secondary'>"+ i + "</span>, " }
    }
    text = text + "</p>"
    exerciseThreeOutput.insertAdjacentHTML("beforeend", text)
}
/*=========================================================================================*/

/*========================= Exercise Four, Palindrome Detector ============================*/
const exerciseFourInput = document.getElementById("exerciseFourInput");
const exerciseFourOutput = document.getElementById("exerciseFourOutput");
document.getElementById("exerciseFourCalculate").addEventListener("click", exerciseFour)
function exerciseFour() {
    var word = exerciseFourInput.value;
    if (word === word.split("").reverse().join("")) {
        exerciseFourOutput.value = "The supplied world '" + word + "' is an Palindrome!";
    }
    else {
        exerciseFourOutput.value = "The supplied world '" + word + "' is not an Palindrome!";
    }
}
/*=========================================================================================*/



