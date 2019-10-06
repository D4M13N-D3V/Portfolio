//Create Constants For Input And Output
const exerciseFiveInputOne = document.getElementById("exerciseFiveInputTwo");
const exerciseFiveInputTwo = document.getElementById("exerciseFiveInputOne");
const exerciseFiveOutput = document.getElementById("exerciseFiveOutput");
exerciseFiveOutput.addEventListener("click", function () {
    exerciseFiveOutput.select();
    Document.execCommand('copy');
})

//Add click events for the buttons
document.getElementById("exerciseFiveEncrypt").addEventListener("click", encrypt)
document.getElementById("exerciseFiveDecrypt").addEventListener("click", decrypt)
function decrypt() {
    let message = makeWordLettersOnly(exerciseFiveInputOne.value);
    let keyword = makeWordLettersOnly(exerciseFiveInputTwo.value);
    let keywordLength = keyword.length;
    let messageLength = message.length;
    //Make sure that the keyword is greater than two and the the message is greater then two
    if (keyword.length < 2) {
        DisplayError(2); return;
    }
    if (message.length < 2) {
        DisplayError(3); return;
    }
    //Make sure that the division remainder of the message length and keyword length are 0 to ensure that the padding was added to the encrypted text.
    if (messageLength % keywordLength != 0) {
        DisplayError(4); return;
    }
    let grid = createGrid(message, keyword, keywordLength, messageLength)
    grid = populateGridDecrypt(grid, keyword, message, keywordLength, messageLength);
    let text = readDecryptedMessage(grid, keyword, keywordLength, messageLength)
    exerciseFiveOutput.value = text;
}
function encrypt() {
    let message = makeWordLettersOnly(exerciseFiveInputOne.value);
    let keyword = makeWordLettersOnly(exerciseFiveInputTwo.value);
    let keywordLength = keyword.length;
    let messageLength = message.length;
    //Make sure that the keyword is greater than two and the the message is greater then two
    if (keyword.length < 2) {
        DisplayError(2); return;
    }
    if (message.length < 2) {
        DisplayError(3); return;
    }
    // Add padding to make sure that the message length division remainder against keyword length is 0
    while (message.length % keywordLength != 0) {
        message = message + "x"
    }
    let grid = createGrid(message, keyword, keywordLength, messageLength)
    grid = populateGridEncrypt(grid, message, keywordLength, messageLength);
    let text = readEncryptedMessage(grid, keyword, keywordLength, messageLength)
    exerciseFiveOutput.value = text;
}
function createGrid(message, keyword, keywordLength, messageLength) {
    // Calculate how many collums and rows you need and create a 2D array based off of these values
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;
    let grid = []
    for (col = 0; col < rowAmount; col++) {
        grid.push(new Array(colAmount))
    }
    return grid;
}
function populateGridEncrypt(grid, message, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;
    let messageArray = message.split("")
    // Populate the grid from left to right and top to bottom.
    for (i = 0; i < rowAmount; i++) {
        for (k = 0; k < colAmount; k++) {
            // Set the character for that grid spot.
            grid[i][k] = messageArray[0]
            messageArray.shift()
        }
    }
    return grid;
}
function readEncryptedMessage(grid, keyword, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;

    //Create an array to keep track of which indexs need to be filled first.
    let orderedIndexs = new Array()
    //Create a array for original keyword and one for the sorted keyword.
    let keywordArraySorted = keyword.split("")
    let keywordArray = keyword.split("")
    keywordArraySorted.sort()
    for (index = 0; index < keywordLength; index++) {
        //Add to the array where we keep track of the indexs of the keyword array in order to know which one comes first alphabetically
        orderedIndexs.push(keywordArray.indexOf(keywordArraySorted[index]))
    }

    let text = ""
    // Loop through cols and rows
    for (i = 0; i < colAmount; i++) {
        for (k = 0; k < rowAmount; k++) {
            // Add to the output string by reading out the top from bottom of the collum of the first collumn by alphabetical
            text += grid[k][keywordArray.indexOf(keywordArraySorted[i])]
        }
    }
    return text;
}
function populateGridDecrypt(grid, keyword, message, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;
    let messageArray = message.split("")

    //Create an array to keep track of which indexs need to be filled first.
    let orderedIndexs = new Array()
    //Create a array for original keyword and one for the sorted keyword.
    let keywordArraySorted = keyword.split("")
    let keywordArray = keyword.split("")
    keywordArraySorted.sort()
    for (index = 0; index < keywordLength; index++) {
        //Add to the array where we keep track of the indexs of the keyword array in order to know which one comes first alphabetically
        orderedIndexs.push(keywordArray.indexOf(keywordArraySorted[index]))
    }
    // Loop through cols and rows
    for (i = 0; i < colAmount; i++) {
        for (k = 0; k < rowAmount; k++) {
            // Fill the grid from top to bottom of the collumns alphabetically.
            grid[k][keywordArray.indexOf(keywordArraySorted[i])] = messageArray[0]
            messageArray.shift()
        }
    }
    return grid;
}
function readDecryptedMessage(grid, keyword, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;
    // Otuput the string left to rip and top to bottom.
    let text = ""
    for (k = 0; k < rowAmount; k++) {
        for (i = 0; i < colAmount; i++) {
            text += grid[k][i]
        }
    }
    return text;
}