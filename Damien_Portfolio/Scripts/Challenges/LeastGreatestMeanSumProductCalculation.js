
//Add event listeners for the two buttons, didnt create variables as they were not refrenced anywhere else.
document.getElementById("exerciseOneCalculateButton").addEventListener("click", exerciseOne);
document.getElementById("exerciseOneGenerateButton").addEventListener("click", ex1GenNum);

//crate an constant array of the input fields so do not have to keep grabbing them.
const exerciseOneInputs = [document.getElementById("exerciseOneInputOne"),
document.getElementById("exerciseOneInputTwo"),
document.getElementById("exerciseOneInputThree"),
document.getElementById("exerciseOneInputFour"),
document.getElementById("exerciseOneInputFive")]


//create an constant array of the output fields so do not have to keep grabbing them.
const exerciseOneOutputs = [document.getElementById("exerciseOneOutputOne"),
document.getElementById("exerciseOneOutputTwo"),
document.getElementById("exerciseOneOutputThree"),
document.getElementById("exerciseOneOutputFour"),
document.getElementById("exerciseOneOutputFive")]


function exerciseOne() {
    //Create a array of the values of the inputs.
    var inputs = [parseInt(makeWordNumbersOnly(exerciseOneInputs[0].value)),
                  parseInt(makeWordNumbersOnly(exerciseOneInputs[1].value)),
                  parseInt(makeWordNumbersOnly(exerciseOneInputs[2].value)),
                  parseInt(makeWordNumbersOnly(exerciseOneInputs[3].value)),
                  parseInt(makeWordNumbersOnly(exerciseOneInputs[4].value))];
    inputs = BubbleSort(inputs) // Use my custom sorter from my challenge
    //Loop through values and make sure they arent undefined , nothing, or 0, if so display an error.
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i] == undefined || inputs[i] == "" || inputs[i] == 0) {
            DisplayError(1)
            return;
        }
    }
    var mean = math.mean(inputs)
    var total = inputs.reduce(totalFunc)
    var product = inputs.reduce(productFunc)
    exerciseOneOutputs[0].value = "Least [" + inputs[0] + "]";
    exerciseOneOutputs[1].value = "Greatest [" + inputs[inputs.length - 1] + "]";
    exerciseOneOutputs[2].value = "Mean [" + mean + "]";
    exerciseOneOutputs[3].value = "Total [" + total + "]";
    exerciseOneOutputs[4].value = "Product [" + product + "]";
}
function totalFunc(total, num) {
    return total + num;
}
function productFunc(total, num) {
    return total * num;
}
function ex1GenNum() {
    //Loop through inputs and set the value to a random integer between 1 and 100
    for (i = 0; i < 5; i++) {
        exerciseOneInputs[i].value = Math.floor(Math.random() * 100) + 1;
    }
}


