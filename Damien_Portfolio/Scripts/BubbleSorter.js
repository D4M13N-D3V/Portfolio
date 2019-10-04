function BubbleSort(array) {
    let needsToBeSwapped = false; // Determines If Needs To Be Swapped Again
    let timesToLoop = array.length - 1; // Gets the amount of times we need to loop
    do { // do code once then use while loop
        needsToBeSwapped = false; // Reset this value
        for (i = 0; i < timesToLoop; i++) { // Loop Through Numbers
            if (array[i] < array[i + 1]) {
                let tmp = array[i] // makes tmp var to store value of current numbers
                array[i] = array[i + 1] // Sets value of current number to next number 
                array[i + 1] = tmp; // Sets value of next number to current number;
                needsToBeSwapped = true; // Tells program needs to be swapped again
            }
        }
        timesToLoop--; // Incremenet down so it knows how many numbers have already been swapped
    }
    while (needsToBeSwapped) // Runs code until this is false
    return array;
}

function BubbleSortVisual(array,element) {
    let needsToBeSwapped = false; // Determines If Needs To Be Swapped Again
    let timesToLoop = array.length - 1; // Gets the amount of times we need to loop
    do { // do code once then use while loop
        needsToBeSwapped = false; // Reset this value
        for (i = 0; i < timesToLoop; i++) { // Loop Through Numbers
            if (array[i] < array[i + 1]) {
                let tmp = array[i] // makes tmp var to store value of current numbers
                array[i] = array[i + 1] // Sets value of current number to next number 
                array[i + 1] = tmp; // Sets value of next number to current number;
                needsToBeSwapped = true; // Tells program needs to be swapped again
                setTimeout(function () { }, 250)
                text = ""
                for (i = 0; i < array.length; i++) {
                    text += array[i] + ","
                }
                text = text.substr(0, text.length - 1)
                numberDisplay.innerHTML = text
            }
        }
        timesToLoop--; // Incremenet down so it knows how many numbers have already been swapped
    }
    while (needsToBeSwapped) // Runs code until this is false
    return array;
}

let numberDisplay = document.getElementById("exerciseSevenDisplay")
let numbers = []
window.addEventListener("load", function () {
    let text = ""
    for (i = 1; i < 10; i++) {
        number = Math.floor(Math.random() * 100) + 1;
        numbers.push(number)
        text += number + ","
    }
    text = text.substr(0, text.length - 1)
    numberDisplay.innerHTML = text;
})

document.getElementById("exerciseSevenGenerate").addEventListener("click", function () {
    numbers = []
    let text = ""
    for (i = 1; i < 10; i++) {
        number = Math.floor(Math.random() * 100) + 1;
        numbers.push(number)
        text += number + ","
    }
    text = text.substr(0, text.length - 1)
    numberDisplay.innerHTML = text;
})

document.getElementById("exerciseSevenBubblesort").addEventListener("click", function () {
    let numbersSorted = BubbleSort(numbers)
    text = ""
    for (i = 0; i < numbersSorted.length; i++) {
        text += numbersSorted[i] + ","
    }
    text = text.substr(0, text.length - 1)
    numberDisplay.innerHTML = text;
})

document.getElementById("exerciseSevenBubblesortVisual").addEventListener("click", function () {
    let numbersSorted = BubbleSortVisual(numbers)
    text = ""
    for (i = 0; i < numbersSorted.length; i++) {
        text += numbersSorted[i] + ","
    }
    text = text.substr(0, text.length - 1)
    numberDisplay.innerHTML = text;
})

sevenCode = document.getElementById("exerciseSevenCode")
document.getElementById("exerciseSevenToggle").addEventListener("click", function () {
    if (sevenCode.style.display == "none") sevenCode.style.display = "block";
    else sevenCode.style.display = "none"
})