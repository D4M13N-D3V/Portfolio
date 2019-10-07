// Set the input and output fields as constants so dont have to constantly grab them
const exerciseThreeInputOne = document.getElementById("exerciseThreeInputOne");
const exerciseThreeInputTwo = document.getElementById("exerciseThreeInputTwo");
const exerciseThreeOutput = document.getElementById("exerciseThreeOutput");
// Add event listener for the calculate button.
document.getElementById("exerciseThreeCalculate").addEventListener("click", exerciseThree)
window.addEventListener("load", exerciseThree)
function exerciseThree() {
    // Clears the output
    exerciseThreeOutput.innerHTML = ""
    var rows = []
    // Get the inputs
    var inputOne = exerciseThreeInputOne.value;
    var inputTwo = exerciseThreeInputTwo.value;
    var text = "<p>" // p
    //Loop through 1 to 100
    for (i = 1; i < 101; i++) {
        let fizz = i % inputOne == 0
        let buzz = i % inputTwo == 0;
        if (!fizz && !buzz) text = text + "<span class='h4' style='color:red'>FizzBuzz</span>, "
        else if (!buzz) text = text + "<span class='h5' style='color:green'>Buzz</span>, " 
        else if (!fizz) text = text + "<span class='h5' style='color:blue'>Fizz</span>, "
        else text = text + "<span class='text-secondary'>" + i + "</span>, " 
    }
    text = text.substr(0, text.length - 2) + "</p>"
    exerciseThreeOutput.insertAdjacentHTML("beforeend", text)
}