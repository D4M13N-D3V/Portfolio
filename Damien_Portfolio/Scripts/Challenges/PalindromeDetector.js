//Get constants for inputs and outputs so i dont have to keep grabbing them
const exerciseFourInput = document.getElementById("exerciseFourInput");
const exerciseFourOutput = document.getElementById("exerciseFourOutput");
//Add click event for calculate button
document.getElementById("exerciseFourCalculate").addEventListener("click", exerciseFour)
function exerciseFour() {
    var word = makeWordLettersOnly(exerciseFourInput.value);
    if (word.length)
        //compare the word to its self turned into an array , reversed, and then turned back into a string
        if (word === word.split("").reverse().join("")) {
            exerciseFourOutput.value = "The supplied world '" + word + "' is an Palindrome!";
        }
        else {
            exerciseFourOutput.value = "The supplied world '" + word + "' is not an Palindrome!";
        }
}   