$("#exerciseNineNumberToCheck,#exerciseOneInputOne,#exerciseOneInputTwo,#exerciseOneInputThree,#exerciseOneInputFour,#exerciseOneInputFive,#exerciseThreeInputOne, #exerciseThreeInputTwo, #exerciseTwoInput").keypress(function (e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        return false
    }
})

let curError = undefined
function DisplayError(type) {
    switch (type) {
        case 1:
            $("#exerciseOne").modal("hide")
            bootbox.alert({
                size: "small",
                title: "Error",
                message: "Invalid input, one of the inputs is not a number or equal to 0",
                callback: function () {
                    $("#exerciseOne").modal("show")
                }
            })
            break;
        case 2:
            $("#exerciseFive").modal("hide")
            bootbox.alert({
                size: "small",
                title: "Error",
                message: "Keyword not long enough, needs to be more than two characters!",
                callback: function () {
                    $("#exerciseFive").modal("show")
                }
            })
            break;
        case 3:
            $("#exerciseFive").modal("hide")
            bootbox.alert({
                size: "small",
                title: "Error",
                message: "Keyword not long enough, needs to be more than two characters!",
                callback: function () {
                    $("#exerciseFive").modal("show")
                }
            })
            break;
        case 4:
            $("#exerciseFive").modal("hide")
            bootbox.alert({
                size: "small",
                title: "Error",
                message: "Message Incorrect , Missing Padding!",
                callback: function () {
                    $("#exerciseFive").modal("show")
                }
            })
            break;
    }
}
var shuffle = function (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};
//removes everything but the letters
function makeWordLettersOnly(word) {
    return word.toLowerCase().replace(/[^a-z]/g, "")
}

//removes everything but the letters
function makeWordNumbersOnly(word) {
    return word.toLowerCase().replace(/[^0-9]/g, "")
}