/* 1. Least,Greatest,Mean,Sum,Product
 * 2. Factorial Calculator
 * 3. Fizz Buzz
 * 4. Palindrome Detector
 * 6. Sum of all fears.
 * 7. API Interaction
 */



// #region Calculation Challenge
document.getElementById("exerciseOneCalculateButton").addEventListener("click", exerciseOne);
document.getElementById("exerciseOneGenerateButton").addEventListener("click", GenerateNumbers);
const exerciseOneInputs = [document.getElementById("exerciseOneInputOne"),
                           document.getElementById("exerciseOneInputTwo"), 
                           document.getElementById("exerciseOneInputThree"),
                           document.getElementById("exerciseOneInputFour"), 
                           document.getElementById("exerciseOneInputFive")]

const exerciseOneOutputs = [document.getElementById("exerciseOneOutputOne"),
                            document.getElementById("exerciseOneOutputTwo"),
                            document.getElementById("exerciseOneOutputThree"),
                            document.getElementById("exerciseOneOutputFour"),
                            document.getElementById("exerciseOneOutputFive")]
function exerciseOne() {
    var inputs = [parseInt(exerciseOneInputs[0].value),
                  parseInt(exerciseOneInputs[1].value),
                  parseInt(exerciseOneInputs[2].value), 
                  parseInt(exerciseOneInputs[3].value), 
                  parseInt(exerciseOneInputs[4].value)];
    inputs.sort(function (a, b) { return a - b });
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i] == undefined || inputs[i]=="") {
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
function GenerateNumbers() {
    for (i = 0; i < 5; i++) {
        exerciseOneInputs[i].value = Math.floor(Math.random() * 100) + 1;
    }
}
// #endregion


// #region Factorial Calculator
const exerciseTwoInput = document.getElementById("exerciseTwoInput");
const exerciseTwoOutputOne = document.getElementById("exerciseTwoOutputOne");
const exerciseTwoOutputTwo = document.getElementById("exerciseTwoOutputTwo");
document.getElementById("exerciseTwoCalculate").addEventListener("click", exerciseTwo)
function exerciseTwo() {
    var startingNumber = exerciseTwoInput.value;
    var total = 1
    var string = ""
    for (i = startingNumber; i > 0; i--) {
        string = string + i + "*"
        total = total * i;
    }
    var string = string.substring(0, string.length - 1);
    var string = string + "=" + total;
    exerciseTwoOutputTwo.innerHTML = math.floor(total);
    exerciseTwoOutputOne.value = string;

}
// #endregion

// #region FizzBuzz
const exerciseThreeInputOne = document.getElementById("exerciseThreeInputOne");
const exerciseThreeInputTwo = document.getElementById("exerciseThreeInputTwo");
const exerciseThreeOutput = document.getElementById("exerciseThreeOutput");
document.getElementById("exerciseThreeCalculate").addEventListener("click", exerciseThree)
window.addEventListener("load", exerciseThree)
function exerciseThree() {
    exerciseThreeOutput.innerHTML = ""
    var rows = []
    var inputOne = exerciseThreeInputOne.value;
    var inputTwo = exerciseThreeInputTwo.value;
    for (i = 0; i < 10; i++) {
        exerciseThreeOutput.i
        exerciseThreeOutput.insertAdjacentHTML("beforeend", "<row id='exerciseThreeOutputRow" + i + "'> </row>")
        rows[i] = document.getElementById("exerciseThreeOutputRow" + i)
    }
    var text = "<p>"
    for (i = 1; i < 101; i++) {
        if (i % inputOne == 0 && i % inputTwo == 0) { text = text +"<span class='h4' style='color:red'>FizzBuzz</span>, " }
        else if (i % inputTwo == 0) { text = text +"<span class='h5' style='color:green'>Buzz</span>, " }
        else if (i % inputOne == 0) { text = text +"<span class='h5' style='color:blue'>Fizz</span>, " }
        else { text = text + "<span class='text-secondary'>" + i + "</span>, " }
    }
    text = text.substr(0, text.length-2) + "</p>"
    exerciseThreeOutput.insertAdjacentHTML("beforeend", text)
}
// #endregion

// #region Palindrome Detector
const exerciseFourInput = document.getElementById("exerciseFourInput");
const exerciseFourOutput = document.getElementById("exerciseFourOutput");
document.getElementById("exerciseFourCalculate").addEventListener("click", exerciseFour)
function exerciseFour() {
    var word = exerciseFourInput.value;
    if (word.length)
    if (word === word.split("").reverse().join("")) {
        exerciseFourOutput.value = "The supplied world '" + word + "' is an Palindrome!";
    }
    else {
        exerciseFourOutput.value = "The supplied world '" + word + "' is not an Palindrome!";
    }
}
// #endregion

// #region Columndrum Cipher
const exerciseFiveInputOne = document.getElementById("exerciseFiveInputTwo");
const exerciseFiveInputTwo = document.getElementById("exerciseFiveInputOne");
const exerciseFiveOutput = document.getElementById("exerciseFiveOutput");
const library = "abcdefghijklmnopqrstuvwxyz";
document.getElementById("exerciseFiveEncrypt").addEventListener("click", encrypt)
document.getElementById("exerciseFiveDecrypt").addEventListener("click", decrypt)
function decrypt() {
    let message = cleanWord(exerciseFiveInputOne.value);
    let keyword = cleanWord(exerciseFiveInputTwo.value);
    let keywordLength = keyword.length;
    let messageLength = message.length;
    if (keyword.length < 2) {
        DisplayError(1); return;
    }
    if (message.length < 2) {
        DisplayError(2); return;
    }
    if (messageLength % keywordLength != 0) {
        DisplayError(4); return;
    }
    let grid = createGrid(message, keyword, keywordLength, messageLength)
    grid = populateGridDecrypt(grid, keyword, message, keywordLength, messageLength);
    let text = readDecryptedMessage(grid, keyword, keywordLength, messageLength)
    console.log(grid)
    exerciseFiveOutput.value = text;
}
function encrypt() {
    let message = cleanWord(exerciseFiveInputOne.value);
    let keyword = cleanWord(exerciseFiveInputTwo.value);
    let keywordLength = keyword.length;
    let messageLength = message.length;
    if (keyword.length < 2) {
        DisplayError(1); return;
    }
    if (message.length < 2) {
        DisplayError(2); return;
    }
    if (messageLength % keywordLength != 0) {
        DisplayError(4); return;
    }
    let grid = createGrid(message, keyword, keywordLength, messageLength)
    grid = populateGridEncrypt(grid, message, keywordLength, messageLength);
    let text = readEncryptedMessage(grid, keyword,keywordLength, messageLength)
    exerciseFiveOutput.value = text;
}
function createGrid(message, keyword, keywordLength, messageLength) {
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
    for (i = 0; i < rowAmount; i++) {
        for (k = 0; k < colAmount; k++) {
            grid[i][k] = messageArray[0]
            messageArray.shift()
        }
    }
    return grid;
}
function readEncryptedMessage(grid, keyword,keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;

    let orderedIndexs = new Array()
    let keywordArraySorted = keyword.split("")
    let keywordArray = keyword.split("")
    keywordArraySorted.sort()
    for (index = 0; index < keywordLength; index++) {
        orderedIndexs.push(keywordArray.indexOf(keywordArraySorted[index]))
    }

    let text = ""
    for (i = 0; i < colAmount; i++) {
        for (k = 0; k < rowAmount; k++) {
            text += grid[k][keywordArray.indexOf(keywordArraySorted[i])]
        }
    }
    return text;
}
function populateGridDecrypt(grid, keyword, message, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;
    let messageArray = message.split("")
    let orderedIndexs = new Array()
    let keywordArraySorted = keyword.split("")
    let keywordArray = keyword.split("")
    keywordArraySorted.sort()
    for (index = 0; index < keywordLength; index++) {
        orderedIndexs.push(keywordArray.indexOf(keywordArraySorted[index]))
    }

    for (i = 0; i < colAmount; i++) {
        for (k = 0; k < rowAmount; k++) {
            grid[k][keywordArray.indexOf(keywordArraySorted[i])] = messageArray[0]
            messageArray.shift()
        }
    }
    return grid;
}
function readDecryptedMessage(grid, keyword, keywordLength, messageLength) {
    let colAmount = keywordLength;
    let rowAmount = messageLength / colAmount;

    let text = ""
    for (k = 0; k < rowAmount; k++) {
        for (i = 0; i < colAmount; i++) {
            text += grid[k][i]
        }
    }
    return text;
}

function cleanWord(word){
    return word.toLowerCase().replace(/[^a-z]/g, "")
}
// #endregion

// #region Blackjack
const informationElement = document.getElementById("blackjackInfo")
var players = []
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"]
var cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 11]
var suits = ["♥️", "♦️", "♣️","♠️"]
var deck = []
var cardsVisible = false;
var cardsDealt = false;
var gameOver = false;
const playerCount = 6;




/*classes*/
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
        if (this.Owner.Hand.Cards.length < 1) {
            if (cardSuitIndex == 0 || cardSuitIndex == 1) labelClass = "label-danger"
            if (cardSuitIndex == 2 || cardSuitIndex == 3) labelClass = "label-default"
            labelContent = this.Suit + " " + this.Value
        }
        else {
            if (this.Owner.Id == 0) {
                if (cardSuitIndex == 0 || cardSuitIndex == 1) labelClass = "label-danger"
                if (cardSuitIndex == 2 || cardSuitIndex == 3) labelClass = "label-default"
                labelContent = this.Suit + " " + this.Value
            }
            else labelContent = "x"
        }
        this.HTML = `<div class="row" > <span class="label ${labelClass}" id="Player${this.Owner.Id}Card${this.Owner.Hand.Cards.length}">${labelContent}</span></div >`;
        document.getElementById(`Player${this.Owner.Id}`).insertAdjacentHTML("beforeend", this.HTML)
        this.Element = document.getElementById(`Player${this.Owner.Id}Card${this.Owner.Hand.Cards.length}`)
    }
    this.Show = function () {
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
        card.Owner = this.Player;
        card.Draw()
        this.Cards.push(card)
        deck.splice(0, 1)
        if (this.Weight > 21 && this.Player.Id == 0) Bust()
        if (this.Weight == 21 && this.Player.Id == 0) Blackjack();
    }
}

function Player(id, user, dealer) {
    this.User = user;
    this.Dealer = dealer
    this.Hand = new PlayerHand(this)
    this.Id = id
    this.GetWeight = function () {
        var weight = 0;
        for (i = 0; i < Hand.cards; i++) {
            weight += cards[i].Weight;
        }
        return weight;
    }
}
/*=========*/

window.addEventListener("load", createDeck)
window.addEventListener("load", SetupPlayers)

function SetupPlayers() {
    for (i = 0; i < 6; i++) {
        if (i == 0) players[i] = new Player(i,true,false)
        else if (i == 6) players[i] = new Player(i,false,true)
        else players[i] = new Player(i,false,false)
    }
}

function createDeck() {
    deck=[]
    for (i = 0; i < cards.length; i++) {
        for (k = 0; k < suits.length; k++) {
            var weight = parseInt(cardValues[i])
            var card = new Card(cards[i], suits[k], weight)
            deck.push(card)
        }
    }
}
function shuffleDeck() {
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
    for (i = 0; i < 10; i++) {
        player = players[currentPlayer].Hand.dealCard()
        currentPlayer = currentPlayer + 1;
        if (currentPlayer == 5) currentPlayer = 0
    }
    for (i = 0; i < 4; i++) {
        while (players[i].Hand.Weight <= 14) {
            players[i].Hand.dealCard()
        }
    }
}
function Bust() {
    endGame(1);
}
function Blackjack() {
    endGame(2);
}

function endGame(endstate) {
    gameOver = true;
    let dealerBusted = false;
    let dealerScore = players[4].Hand.Weight;

    for (i = 1; i < 5; i++) {
        for (k = 1; k < players[i].Hand.Cards.length; k++) {
            players[i].Hand.Cards[k].Show()
        }
    }
    for (i = 0; i < 4; i++) {
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
        players[i].Hand.Cards = []
        players[i].Hand.Weight = 0
        var htmlElement = document.getElementById(`Player${i}`);
        while (htmlElement.children.length > 1) {
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
    if (cardsDealt == true && gameOver==false) {
        players[0].Hand.dealCard()
    }
}
function standButton() {
    if (cardsDealt == true) {
        endGame(3)
    }
}

document.getElementById("exerciseSixDeal").addEventListener("click", dealButton)
document.getElementById("exerciseSixHit").addEventListener("click", hitButton)
document.getElementById("exerciseSixStand").addEventListener("click", standButton)
// #endregion




/*UTILS*/
function DisplayError(type) {
    switch (type) {
        case 1:
            alert("Invalid Input")
            break;
        case 2:
            alert("Message incorrect")
            break;
        case 4:
            alert("The amount of characters in the message must be divisible by the amount in the keyword!")
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



/* BUTTON HANDLES FOR VIEWING CODE */

oneCode = document.getElementById("exerciseOneCode")
document.getElementById("exerciseOneToggle").addEventListener("click", function () {
    if (oneCode.style.display == "none") oneCode.style.display = "block";
    else oneCode.style.display = "none"
})
twoCode = document.getElementById("exerciseTwoCode")
document.getElementById("exerciseTwoToggle").addEventListener("click", function () {
    if (twoCode.style.display == "none") twoCode.style.display = "block";
    else twoCode.style.display = "none"
})
threeCode = document.getElementById("exerciseThreeCode")
document.getElementById("exerciseThreeToggle").addEventListener("click", function () {
    if (threeCode.style.display == "none") threeCode.style.display = "block";
    else threeCode.style.display = "none"
})
fourCode = document.getElementById("exerciseFourCode")
document.getElementById("exerciseFourToggle").addEventListener("click", function () {
    if (fourCode.style.display == "none") fourCode.style.display = "block";
    else fourCode.style.display = "none"
})
fiveCode = document.getElementById("exerciseFiveCode")
document.getElementById("exerciseFiveToggle").addEventListener("click", function () {
    if (fiveCode.style.display == "none") fiveCode.style.display = "block";
    else fiveCode.style.display = "none"
})
sixCode = document.getElementById("exerciseSixCode")
document.getElementById("exerciseSixToggle").addEventListener("click", function () {
    if (sixCode.style.display == "none") sixCode.style.display = "block";
    else sixCode.style.display = "none"
})

exerciseonet

/*=================================*/