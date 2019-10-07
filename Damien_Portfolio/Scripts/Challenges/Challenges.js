const informationElement = document.getElementById("blackjackInfo")
const playerCount = 5;
var players = []
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"]
var cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 11]
var suits = ["♥️", "♦️", "♣️", "♠️"]
var deck = []
var cardsVisible = false;
var cardsDealt = false;
var gameOver = false;


window.addEventListener("load", createDeck)
window.addEventListener("load", setupPlayers)
document.getElementById("exerciseSixDeal").addEventListener("click", dealButton)
document.getElementById("exerciseSixHit").addEventListener("click", hitButton)
document.getElementById("exerciseSixStand").addEventListener("click", standButton)



/*=Classes=*/
function Card(value, suit, weight) {
    this.Owner = undefined
    this.Value = value;
    this.Suit = suit;
    this.Weight = weight;
    this.HTML = undefined
    this.Element = undefined;
    this.Draw = function () {
        let cardSuitIndex = suits.indexOf(this.Suit)
        let labelClass = "label-success"
        let labelContent = ""
        //Check if first card
        if (this.Owner.Hand.Cards.length < 1) {
            if (cardSuitIndex == 0 || cardSuitIndex == 1) labelClass = "label-danger"
            if (cardSuitIndex == 2 || cardSuitIndex == 3) labelClass = "label-default"
            labelContent = this.Suit + " " + this.Value
        }
        else {
            //Only show the players full hand hide the rest.
            if (this.Owner.Id == 0) {
                if (cardSuitIndex == 0 || cardSuitIndex == 1) labelClass = "label-danger"
                if (cardSuitIndex == 2 || cardSuitIndex == 3) labelClass = "label-default"
                labelContent = this.Suit + " " + this.Value
            }
            else labelContent = "x"
        }
        // Insert a html element representing card.
        this.HTML = `<div class="row" > <span class="label ${labelClass}" id="Player${this.Owner.Id}Card${this.Owner.Hand.Cards.length}">${labelContent}</span></div >`;
        document.getElementById(`Player${this.Owner.Id}`).insertAdjacentHTML("beforeend", this.HTML)
        this.Element = document.getElementById(`Player${this.Owner.Id}Card${this.Owner.Hand.Cards.length}`)
    }
    this.Show = function () {
        //Change this card to be shwoing instead of face down.
        let cardSuitIndex = suits.indexOf(this.Suit)
        let labelClass = "label-success"
        let labelContent = ""
        if (cardSuitIndex == 0 || cardSuitIndex == 1) labelClass = "label-danger"
        if (cardSuitIndex == 2 || cardSuitIndex == 3) labelClass = "label-default"
        labelContent = this.Suit + " " + this.Value
        this.Element.classList.remove("label-success")
        this.Element.classList.add(labelClass)
        this.Element.innerHTML = labelContent
    }
}


function PlayerHand(player) {
    this.Player = player
    this.Cards = []
    this.Weight = 0;
    this.dealCard = function () {
        var card = getNextCard(false);
        this.Weight += card.Weight;
        // set the cards ownera nd draw it.
        card.Owner = this.Player;
        card.Draw()
        this.Cards.push(card)
        //remove card from the deck
        deck.splice(0, 1)
        //Make sure that the player did not hit blackjack or bust if it is the user.
        if (this.Weight > 21 || this.Weight == 21 && this.Player.Id == 0) endGame();
    }
}

function Player(id, user, dealer) {
    this.User = user;
    this.Dealer = dealer
    this.Hand = new PlayerHand(this)
    this.Id = id 
}
/*=========*/


function setupPlayers() {
    //Loop through the amount of players and make the first player the user and the last player the dealer.
    for (i = 0; i < playerCount; i++) {
        if (i == 0) players[i] = new Player(i, true, false)
        else if (i == playerCount) players[i] = new Player(i, false, true)
        else players[i] = new Player(i, false, false)
    }
}
function createDeck() {
    //Reset Deck Array
    deck = []
    //Loop trhough all the card types
    for (i = 0; i < cards.length; i++) {
        //Loop trhough suits
        for (k = 0; k < suits.length; k++) {
            //Get weight based off the card type
            var weight = parseInt(cardValues[i])
            //Create a new card object with the card type, suit, and weight
            var card = new Card(cards[i], suits[k], weight)
            deck.push(card)
        }
    }
}
function shuffleDeck() {
    //Use util function to shuffle array.
    shuffle(deck);
}
function getNextCard(remove) {
    card = deck[0]
    if (remove == true) deck.splice(0, 1)
    return card;
}
function dealCards() {
    document.getElementById("exerciseSixDeal").style.display = "none"
    document.getElementById("exerciseSixHit").style.display = "inline-grid"
    document.getElementById("exerciseSixStand").style.display = "inline-grid"
    createDeck();
    shuffleDeck();
    var currentPlayer = 0;
    var currCard = 0;
    for (i = 0; i < playerCount * 2; i++) {
        // Deal a card to the players hand object
        player = players[currentPlayer].Hand.dealCard()
        //Increment Palyer
        currentPlayer = currentPlayer + 1;
        // Make sure the player isnt at the last player if it is then reset it back to 0
        if (currentPlayer == playerCount) currentPlayer = 0
    }
    // Loop through all players but the dealer and check if they are under 14, if they are then hit, if not then stand.
    for (i = 0; i < playerCount-1; i++) {
        while (players[i].Hand.Weight <= 14) {
            players[i].Hand.dealCard()
        }
    }
}
function endGame(endstate) {
    gameOver = true;
    let dealerBusted = false;
    let dealerScore = players[4].Hand.Weight;

    for (i = 1; i < playerCount; i++) {
        for (k = 1; k < players[i].Hand.Cards.length; k++) {
            players[i].Hand.Cards[k].Show()
        }
    }
    for (i = 0; i < playerCount-1; i++) {
        if (21 < players[i].Hand.Weight) {
            document.getElementById(`Player${i}`).insertAdjacentHTML("beforeend", `<div class="row" > <span class="label label-warning">Bust</span></div >`);
        }
        else if (dealerScore < players[i].Hand.Weight) {
            document.getElementById(`Player${i}`).insertAdjacentHTML("beforeend", `<div class="row" > <span class="label label-warning">Won</span></div >`);
        }
        else if (dealerScore > players[i].Hand.Weight && dealerBusted == false) {
            document.getElementById(`Player${i}`).insertAdjacentHTML("beforeend", `<div class="row" > <span class="label label-warning">Lost</span></div >`);
        }
        else if (dealerScore > players[i].Hand.Weight && dealerBusted == true) {
            document.getElementById(`Player${i}`).insertAdjacentHTML("beforeend", `<div class="row" > <span class="label label-warning">Won</span></div >`);
        }
        else if (dealerScore == players[i].Hand.Weight && dealerBusted == false) {
            document.getElementById(`Player${i}`).insertAdjacentHTML("beforeend", `<div class="row" > <span class="label label-warning">Lost</span></div >`);
        }
    }
    setTimeout(function () {
        clearCards()
        gameOver = false;
        document.getElementById("exerciseSixDeal").style.display = "inline-grid"
        document.getElementById("exerciseSixHit").style.display = "none"
        document.getElementById("exerciseSixStand").style.display = "none"
    }, 2000)
}
function clearCards() {
    for (i = 0; i < 5; i++) {
        cardsDealt = false;
        //Reset the players hand's cards and weight.
        players[i].Hand.Cards = []
        players[i].Hand.Weight = 0
        var htmlElement = document.getElementById(`Player${i}`);
        while (htmlElement.children.length > 1) {
            //Remove the html elements displaying the  cards
            htmlElement.removeChild(htmlElement.children[1]);
        }
    }
}
function dealButton() {
    if (cardsDealt == false && gameOver == false) {
        dealCards();
        cardsDealt = true;
    }
}
function hitButton() {
    if (cardsDealt == true && gameOver == false) {
        players[0].Hand.dealCard()
    }
}
function standButton() {
    if (cardsDealt == true) {
        endGame(3)
    }
}
function BubbleSort(array) {
    let needsToBeSwapped = false; // Determines If Needs To Be Swapped Again
    let timesToLoop = array.length - 1; // Gets the amount of times we need to loop
    do { // do code once then use while loop
        needsToBeSwapped = false; // Reset this value
        for (i = 0; i < timesToLoop; i++) { // Loop Through Numbers
            if (array[i] > array[i + 1]) {
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
            if (array[i] > array[i + 1]) {
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
//Create constants holding the HTML elements that are the inputs and outputs.
const exerciseTwoInput = document.getElementById("exerciseTwoInput");
const exerciseTwoOutputOne = document.getElementById("exerciseTwoOutputOne");
const exerciseTwoOutputTwo = document.getElementById("exerciseTwoOutputTwo");
document.getElementById("exerciseTwoCalculate").addEventListener("click", exerciseTwo)
function exerciseTwo() {
    let startingNumber = exerciseTwoInput.value; // get the input
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
    var text = "<p>"
    //Loop through 1 to 100
    for (i = 1; i < 101; i++) {
        // Check the division remainder of the number and the first input and the second input. if 0 then Fizzbuzz
        if (i % inputOne == 0 && i % inputTwo == 0) { text = text + "<span class='h4' style='color:red'>FizzBuzz</span>, " }
        // Check the division remainder of the number and the second input. if 0 then Buzz
        else if (i % inputTwo == 0) { text = text + "<span class='h5' style='color:green'>Buzz</span>, " }
        // Check the division remainder of the number and the first input . if 0 then Fizz
        else if (i % inputOne == 0) { text = text + "<span class='h5' style='color:blue'>Fizz</span>, " }
        else { text = text + "<span class='text-secondary'>" + i + "</span>, " }
    }
    text = text.substr(0, text.length - 2) + "</p>"
    exerciseThreeOutput.insertAdjacentHTML("beforeend", text)
}

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
function BinaryTree() {
    this.root = undefined;
    function Node(value, parent) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    this.Traverse = function(value) {
        let found = this.root;
        let side = "";
        let parent = undefined;
        //Loop until can no longer find the value or finds the value already existing
        while (found && found.value !== value) {
            parent = found;
            //Checks to see if the value needs to go on left or right
            if (value > found.value) {
                side = 'right';
                found = found.right;
            }
            else {
                side = 'left';
                found = found.left;
            }
        }
        return { found: found, parent: parent, side: side}
    }

    this.Add = function (value) {
        //The passed value was undefined and we can not take it.
        if (typeof value === 'undefined') throw new Error("Invalid Argument ( Is Undefined )")
        let newNode = new Node(value, this.root)
        //Set this node as root if root doesnt exist yet
        if (this.root == undefined) {
            this.root = newNode
            return;
        }
        let result = this.Traverse(value)
        //throw error if the result WAS found because that means the value was in there twice
        if (!result.found) {
            //Check what side it goes on and then set its parent, and the parents left or right node depending.
            if (result.side == "left") {
                result.parent.left = newNode
            }
            else if (result.side == "right") {
                result.parent.right = newNode
            }
        }
        else throw new Error("Invalid Argument ( Two Items Of Same Value )")
    }

    this.Search = function (value) {
        return this.Traverse(value).found;
    }
}

generatedBinaryTreeNumbers = []
generatedBinaryTreeNumberOutput = document.getElementById("exerciseBinaryTreeGeneratedNumbers")
CreateBinaryTreeButton = document.getElementById("exerciseBinaryTreeBinaryTree")
exerciseBinaryTreeNumberGenerateButton = document.getElementById("exerciseBinaryTreeGenerate")
binaryTreejson = document.getElementById("jsonViewer")
exerciseBinaryTreeNumberGenerateButton.addEventListener("click", generateBinaryTreeNumbers)
CreateBinaryTreeButton.addEventListener("click", CreateBinaryTree)
window.addEventListener("load", generateBinaryTreeNumbers)


function generateBinaryTreeNumbers() {
    generatedBinaryTreeNumbers = []
    for (i = 0; i < 25; i++) {
        let rdm = 0;
        do {
            rdm = math.floor(math.random() * 100) + 1;
        }
        while (generatedBinaryTreeNumbers.indexOf(rdm) != -1)
        generatedBinaryTreeNumbers.push(rdm)
    }
    let text = ""
    for (i = 0; i < generatedBinaryTreeNumbers.length; i++) text += generatedBinaryTreeNumbers[i] + ","
    text = text.substr(0, text.length - 1)
    generatedBinaryTreeNumberOutput.innerHTML = text;
}

function CreateBinaryTree() {
    console.log("TET")
    if (binaryTreejson.childNodes.length>0) binaryTreejson.removeChild(binaryTreejson.childNodes[0])
    var testTree = new BinaryTree()
    for (i = 0; i < generatedBinaryTreeNumbers.length; i++) { 
        testTree.Add(generatedBinaryTreeNumbers[i])
    }
    var jsonViewer = new JSONViewer();
    binaryTreejson.appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(JSON.parse(JSON.stringify(testTree.root)), -1, -1);
}
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
function TriTree() {
    this.root = null;
    function Node(value) {
        this.Value = value;
        this.Occurances = 0;
        this.Children = []
    }

    this.addWord = function (tmp) {
        tmp = tmp.toLowerCase().split("")
        curLetter = null
        // make a root node if it does not exist
        if (this.root == null) this.root = new Node("**ROOT**")
        currentNode = this.root;
        // loop trhough the letters of the word
        for (letterIndex = 0; letterIndex < tmp.length; letterIndex++) {
            curLetter = tmp[letterIndex]
            // while the current nodes value isnt the current letter keep looping
            while (currentNode.Value != curLetter) {
                // loop trhough the current nodes children
                for (k = 0; k < currentNode.Children.length; k++) {
                    //check the child to see if it IS the current letter
                    if (currentNode.Children[k].Value == curLetter) {
                        // if it is then set the current node to that child and break the loop.
                        currentNode = currentNode.Children[k];
                        break;
                    }
                }
                // check if the current nodes value is the current letter, if it is then we know that it found the node for that letter.
                if (currentNode.Value != curLetter) {
                    tmpNode = currentNode;
                    currentNode = new Node(curLetter)
                    tmpNode.Children.push(currentNode)
                }
            }
        }
        // Increment the occurances up to 1 on the last node so we know that the word is finished and can tell where the word ends in other functions
        currentNode.Occurances += 1
    }

    this.Search = function (tmp) {
        tmp = tmp.toLowerCase().split("")
        curLetter = null
        currentNode = this.root;
        // loop through the letters of the word.
        for (letterIndex = 0; letterIndex < tmp.length; letterIndex++) {
            curLetter = tmp[letterIndex]
            // loop through teh children
            for (k = 0; k < currentNode.Children.length; k++) {
                //check if the child value is equal to the current letter
                if (currentNode.Children[k].Value == curLetter) {
                    // set the current node to that child if it is the current letter
                    currentNode = currentNode.Children[k];
                    break;
                }
            }
            // return 0 matches since the current node is the last node checked and the letter didnt exist where it should have
            if (currentNode.Value != curLetter) return 0
        }
        // check and make sure that the last node checked had the value of the last letter, and then make sure thtat the occurances is greater than 0
        if (currentNode.Value == curLetter && currentNode.Occurances > 0) return currentNode.Occurances;
    }
}
generatedTriTreeWords = []
generatedTriTreeNumberOutput = document.getElementById("exerciseTriTreeGeneratedNumbers")
CreateTriTreeButton = document.getElementById("exerciseTriTreeTriTree")
exerciseTriTreeNumberGenerateButton = document.getElementById("exerciseTriTreeGenerate")
trieTreeSearchButton = document.getElementById("triTreeSearch")
triTreeSearchOutput = document.getElementById("triTreeSearchResults")
triTreeJsonViewer = document.getElementById("triTreeJSONViewer")
exerciseTriTreeNumberGenerateButton.addEventListener("click", generateTriTreeWords)
CreateTriTreeButton.addEventListener("click", CreateTriTree)
trieTreeSearchButton.addEventListener("click", SearchTriTree)
window.addEventListener("load", generateTriTreeWords)

var triTreeTest = null

function SearchTriTree() {
    $("#exerciseEight").modal("hide")
    bootbox.alert({
        size: "small",
        title: "Results", 
        message: triTreeTest.Search(triTreeSearchOutput.value) + " Occurances of '" + triTreeSearchOutput.value + "' were found!",
        callback: function () {
            $("#exerciseEight").modal("show")
        }
    })
    
}

function generateTriTreeWords() {

    fetch("https://random-word-api.herokuapp.com/word?key=jecgaa&number=25")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (responseData) {
            generatedTriTreeWords = responseData.sort();
        });

    generatedTriTreeNumberOutput.value = generatedTriTreeWords.join(" ");
}

function CreateTriTree() {
    if (triTreeJsonViewer.childNodes.length > 0) triTreeJsonViewer.removeChild(triTreeJsonViewer.childNodes[0])
    triTreeTest = new TriTree()
    var words = generatedTriTreeNumberOutput.value.split(" ")
    for (i = 0; i < words.length; i++) {
        triTreeTest.addWord(words[i])
    }
    var jsonViewer = new JSONViewer();
    triTreeJsonViewer.appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(JSON.parse(JSON.stringify(triTreeTest.root)), -1, -1);
}   
function Node(value,priority) {
    this.Value = value;
    this.Priority = priority
}
/* Forumlas For Getting Information From The Heaps
 *  Parent = (index-2)/2
 *  Left Child = Index*2+1
 *  Right Child = Index*2+2
 */
function Heap() {
    this.Heap = []

    this.getRightChildIndex = function(index) { return math.floor(2 * index + 1) }
    this.getLeftChildIndex = function (index) { return math.floor(2 * index + 2) }
    this.getParentIndex = function (index) { return math.floor((index - 1) / 2) }
    this.hasLeftChild = function (index) { return getLeftChildIndex(index) < size; }
    this.hasRightChild = function (index) { return getRightChildIndex(index) < size; }
    this.hasParent = function (index) { return getParentIndex(index) >= 0; }
    this.leftChild = function (index) { return this.Heap[getLeftChildIndex(index)] }
    this.rightChild = function (index) { return this.Heap[getRightChildIndex(index)] }
    this.parent = function (index) { return this.Heap[getParentIndex(index)] }

    this.Swap = function(indexOne, indexTwo){
        temp = this.Heap[indexOne]
        this.Heap[indexOne] = this.Heap[indexTwo]
        this.Heap[indexTwo] = temp;
    }

    this.Insert = function(value, priority){
        let newNode = new Node(value, priority)
        let currentNodeIndex = this.Heap.length
        let currentParentNodeIndex = this.getParentIndex(currentNodeIndex)
        //make sure there is a root node
        if (this.Heap.length<1 ) {
            this.Heap.push( newNode );
            return
        }
        //add node
        this.Heap.push( newNode )
        // loop until the priority is lower then the parent
        while (this.Heap[currentNodeIndex].Priority < this.Heap[currentParentNodeIndex].Priority) {
            var tmp = currentParentNodeIndex
            currentParentNodeIndex = this.getParentIndex(currentNodeIndex)
            currentNodeIndex = tmp;
            this.Swap(currentNodeIndex, currentParentNodeIndex)
        }
        console.log(this.Heap)
    }

    this.Remove = function () {
        let toRemove = this.Heap.shift()
        this.Heap.unshift(this.Heap.pop())
        currentNodeIndex = 0
        found = true
        // Loop until found
        while (found) {
            found = false
            //get the lowest child
            lowestChild = this.getLowestChild(currentNodeIndex);
            //make sure hcild exists
            if (lowestChild != -1) {
                found = true
                //swap places
                this.Swap(currentNodeIndex, lowestChild)
                // set current node to the new child
                currentNodeIndex = lowestChild
            }
        }
        return toRemove;
    }

    this.getLowestChild = function (index) {
        let leftChildIndex = this.getLeftChildIndex(index)
        let rightChildIndex = this.getRightChildIndex(index)
        let hasLeftChild = false
        let hasRightChild = false
        if (this.Heap[leftChildIndex] != undefined) hasLeftChild = true
        if (this.Heap[rightChildIndex] != undefined) hasRightChild = true
        if (hasLeftChild == true && hasRightChild == false) return leftChildIndex
        if (hasLeftChild == false && hasRightChild == true) return rightChildIndex
        if (hasLeftChild == true && hasRightChild == true) {
            if (this.Heap[leftChildIndex].Priority > this.Heap[rightChildIndex].Priority) return leftChildIndex
            else return rightChildIndex
        }
        return -1
    }   
}
binaryHeapGeneratedNumbers = []
binaryHeapGenerateButton = document.getElementById("exerciseBinaryHeapGenerate")
binaryHeapHeapButton = document.getElementById("exerciseBinaryHeapBinaryHeap")
binaryHeapNextButton = document.getElementById("exerciseBinaryHeapNext")
binaryHeapGeneratedNumberOutput = document.getElementById("binaryHeapGeneratedNumbers")
binaryHeapGeneratedHeapedNumbersOutput = document.getElementById("binaryHeapedNumbers")
binaryHeapNextNumberInHeapOutput = document.getElementById("binaryNextNumber")
window.addEventListener("load", generateBinaryHeapNumbers)
binaryHeapGenerateButton.addEventListener("click", generateBinaryHeapNumbers)
binaryHeapHeapButton.addEventListener("click", createHeap)
binaryHeapNextButton.addEventListener("click", nextNumberInHeap)

var binaryHeapTest = null

function generateBinaryHeapNumbers() {
    binaryHeapGeneratedNumbers = []
    for (i = 0; i < 25; i++) {
        let rdm = 0;
        do {
            rdm = math.floor(math.random() * 100) + 1;
        }
        while (binaryHeapGeneratedNumbers.indexOf(rdm) != -1)
        binaryHeapGeneratedNumbers.push(rdm)
    }
    let text = ""
    for (i = 0; i < binaryHeapGeneratedNumbers.length; i++) text += binaryHeapGeneratedNumbers[i] + ","
    text = text.substr(0, text.length - 1)
    binaryHeapGeneratedNumberOutput.innerHTML = text;
}

function createHeap() {
    binaryHeapTest = new Heap()
    let text = ""
    //numbers = shuffle(numbers)
    for (i = 0; i < numbers.length; i++) {
        binaryHeapTest.Insert(numbers[i], numbers[i])
    }
    for (i = 0; i < binaryHeapTest.Heap.length; i++) text += binaryHeapTest.Heap[i].Priority + ","
    text = text.substr(0, text.length - 1)
    binaryHeapGeneratedHeapedNumbersOutput.innerHTML = text;
}

function nextNumberInHeap() {
    let text = binaryHeapTest.Remove().Priority;
    binaryHeapNextNumberInHeapOutput.innerHTML = text;
    text = ""
    for (i = 0; i < binaryHeapTest.Heap.length; i++) text += binaryHeapTest.Heap[i].Priority + ","
    text = text.substr(0, text.length - 1)
    binaryHeapGeneratedHeapedNumbersOutput.innerHTML = text;
}
let binaryTreeTab = document.getElementById("binaryTreeTab")
let binaryHeapTab = document.getElementById("binaryHeapTab")
let trieTreeTab = document.getElementById("trieTreeTab")

let binaryTreeContent = document.getElementById("binaryTreeContent")
let binaryHeapContent = document.getElementById("binaryHeapContent")
let trieTreeContent = document.getElementById("trieTreeContent")

binaryTreeTab.addEventListener("click", openBinaryTreeTab)
binaryHeapTab.addEventListener("click", openbinaryHeapTab)
trieTreeTab.addEventListener("click", openTrieTreeTab)

var currentTab = binaryTreeTab;
var currentContent = binaryTreeContent;

function openBinaryTreeTab() {
    currentTab.classList.remove("active")
    currentContent.style.display = "none"
    binaryTreeTab.classList.add("active")
    binaryTreeContent.style.display = "block"
    currentTab = binaryTreeTab;
    currentContent = binaryTreeContent;
    document.getElementById("exerciseTriTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryHeapCode").style.display = "none"
}
function openTrieTreeTab() {
    currentTab.classList.remove("active")
    currentContent.style.display = "none"
    trieTreeTab.classList.add("active")
    trieTreeContent.style.display = "block"
    currentTab = trieTreeTab;
    currentContent = trieTreeContent;
    document.getElementById("exerciseTriTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryHeapCode").style.display = "none"
}
function openbinaryHeapTab() {
    currentTab.classList.remove("active")
    currentContent.style.display = "none"
    binaryHeapTab.classList.add("active")
    binaryHeapContent.style.display = "block"
    currentTab = binaryHeapTab;
    currentContent = binaryHeapContent;
    document.getElementById("exerciseTriTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryHeapCode").style.display = "none"
}

oneCode = document.getElementById("exerciseOneCode")
twoCode = document.getElementById("exerciseTwoCode")
threeCode = document.getElementById("exerciseThreeCode")
fourCode = document.getElementById("exerciseFourCode")
fiveCode = document.getElementById("exerciseFiveCode")
sixCode = document.getElementById("exerciseSixCode")
binaryTreeCode = document.getElementById("exerciseBinaryTreeCode")
sevenCode = document.getElementById("exerciseSevenCode")
triTreeCode = document.getElementById("exerciseTriTreeCode")
heapCode = document.getElementById("exerciseBinaryHeapCode")
document.getElementById("exerciseOneToggle").addEventListener("click", openOneCode)
document.getElementById("exerciseTwoToggle").addEventListener("click", openTwoCode)
document.getElementById("exerciseThreeToggle").addEventListener("click", openThreeCode)
document.getElementById("exerciseFourToggle").addEventListener("click", openFourCode)
document.getElementById("exerciseFiveToggle").addEventListener("click", openFiveCode)
document.getElementById("exerciseSixToggle").addEventListener("click", openSixCode)
document.getElementById("exerciseBinaryTreeToggle").addEventListener("click", openBinaryCode)
document.getElementById("exerciseSevenToggle").addEventListener("click", openSevenCode)
document.getElementById("exerciseTriTreeToggle").addEventListener("click", openTriCode)
document.getElementById("exerciseBinaryHeapToggle").addEventListener("click", openHeapCode)
function openOneCode() {
    if (oneCode.style.display == "none") oneCode.style.display = "block";
    else oneCode.style.display = "none"
}
function openTwoCode() {
    if (twoCode.style.display == "none") twoCode.style.display = "block";
    else twoCode.style.display = "none"
}
function openThreeCode() {
    if (threeCode.style.display == "none") threeCode.style.display = "block";
    else threeCode.style.display = "none"
}
function openFourCode() {
    if (fourCode.style.display == "none") fourCode.style.display = "block";
    else fourCode.style.display = "none"
}
function openFiveCode(){
    if (fiveCode.style.display == "none") fiveCode.style.display = "block";
    else fiveCode.style.display = "none"
}
function openSixCode(){
    if (sixCode.style.display == "none") sixCode.style.display = "block";
    else sixCode.style.display = "none"
}
function openSevenCode(){
    if (sevenCode.style.display == "none") sevenCode.style.display = "block";
    else sevenCode.style.display = "none"
}
function openBinaryCode(){
    if (binaryTreeCode.style.display == "none") binaryTreeCode.style.display = "block";
    else binaryTreeCode.style.display = "none"
}
function openTriCode() {
    if (triTreeCode.style.display == "none") triTreeCode.style.display = "block";
    else triTreeCode.style.display = "none"
}
function openHeapCode() {
    if (heapCode.style.display == "none") heapCode.style.display = "block";
    else heapCode.style.display = "none"
}