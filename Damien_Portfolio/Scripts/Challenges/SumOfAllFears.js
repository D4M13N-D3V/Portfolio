
function SumOfAllFears( array, number ) {
    for (i = 0; i < array.length; i++) {
        for (k = 0; k < array.length; k++) {
            if (k != i && array[i] + array[k] == number) return { Found: true, numberOne: array[i], numberTwo: array[k] };
        }
    }
    return { Found:false };
}

let sumOfAllFearsNumberDisplay = document.getElementById("exerciseNineGeneratedNumbers")
let sumOfAllFearsNumberToCheck = document.getElementById("exerciseNineNumberToCheck")
let sumOfAllFearsNumbers = []
window.addEventListener("load", function () {
    let text = ""
    for (i = 1; i < 10; i++) {
        number = Math.floor(Math.random() * 100) + 1;
        sumOfAllFearsNumbers.push(number)
        text += number + ","
    }
    text = text.substr(0, text.length - 1)
    sumOfAllFearsNumberDisplay.innerHTML = text;
})

document.getElementById("exerciseNineGenerate").addEventListener("click", function () {
    sumOfAllFearsNumbers = []
    let text = ""
    for (i = 1; i < 10; i++) {
        number = Math.floor(Math.random() * 100) + 1;
        sumOfAllFearsNumbers.push(number)
        text += number + ","
    }
    text = text.substr(0, text.length - 1)
    sumOfAllFearsNumberDisplay.innerHTML = text;
})


document.getElementById("exerciseNineCheck").addEventListener("click", function () {
    let text = "No match!"
    let result = SumOfAllFears(sumOfAllFearsNumbers, parseInt(sumOfAllFearsNumberToCheck.value))
    console.log(result.Found)
    if (result.Found==true) text = "Found match ( " + result.numberOne + "," + result.numberTwo + " )!"
    $("#exerciseNine").modal("hide")
    bootbox.alert({
        size: "small",
        title: "Error",
        message: text,
        callback: function () {
            $("#exerciseNine").modal("show")
        }
    })
})

nineCode = document.getElementById("exerciseNineCode")
document.getElementById("exerciseNineToggle").addEventListener("click", function () {
    if (nineCode.style.display == "none") nineCode.style.display = "block";
    else nineCode.style.display = "none"
})

