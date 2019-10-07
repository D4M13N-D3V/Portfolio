//Create constants holding the HTML elements that are the inputs and outputs.
const exerciseTwoInput = document.getElementById("exerciseTwoInput");
const exerciseTwoOutputOne = document.getElementById("exerciseTwoOutputOne");
const exerciseTwoOutputTwo = document.getElementById("exerciseTwoOutputTwo");
document.getElementById("exerciseTwoCalculate").addEventListener("click", exerciseTwo)
function exerciseTwo() {
    let startingNumber = parseInt(exerciseTwoInput.value); // get the input
    
    if (startingNumber >= 170 || startingNumber<=0) {
        $("#exerciseTwo").modal("hide")
        bootbox.alert({
            size: "small",
            title: "Invalid Input",
            message: "Your input needs to be less then or equal to 170 and greater than 0!",
            callback: function () {
                $("#exerciseTwo").modal("show")
            }
        })
        return;
    }
    let total = 1 // set the starting total to 1 so when you mutiply it by the first number it is just the first number.
    let string = "" // set a empty string to display the math leading up to the solution
    for (i = startingNumber; i > 0; i--) { // Loop down from the starting number
        string = string + i + "*" // Add to the string to show what numbers are being multiplied
        total = total * i; // Update the total by multipling total by the next number
    }
    string = string.substring(0, string.length - 1); // Remove the last character of the output to make sure there is no extra * sign
    string = string + "=" + total; // Add what the product is to the end of the string 
    exerciseTwoOutputTwo.innerHTML = math.floor(total); // Display just the number as the solution.
    exerciseTwoOutputOne.value = string; // Set the value of what shows the math behind the calculations.
} 