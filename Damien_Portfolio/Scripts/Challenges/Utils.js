let curError = undefined
function DisplayError(type) {
    switch (type) {
        case 1:
            curError = bootbox.dialog({ message: "<span class='text-warning'>Invalid Input</span>", closeButton: false })
            break;
        case 2:
            curError = bootbox.dialog({ message:"<span class='text-warning'>Message incorrect</span>",closeButton: false})
            break;
        case 4:
            curError = bootbox.dialog({ message:"<span class='text-warning'>The amount of characters in the message must be divisible by the amount in the keyword!</span>",closeButton: false})
            break;
    }
    setTimeout(function () {
        curError.modal('hide')
    },1500)
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