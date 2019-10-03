﻿/* 1. Least,Greatest,Mean,Sum,Product
 * 2. Factorial Calculator
 * 3. Fizz Buzz
 * 4. Palindrome Detector
 * 6. Sum of all fears.
 * 7. API Interaction
 */



/*============ Exercise One, Least,Greatest,Mean,Sum,Product Calculator=================*/
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
/* =======================================================================================*/


/*========================= Exercise Two, Factorial Calculator ===========================*/
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
/*=========================================================================================*/


/*========================= Exercise Three, Fizz/Buzz ============================*/
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
/*=========================================================================================*/

/*========================= Exercise Four, Palindrome Detector ============================*/
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
/*=========================================================================================*/







/*================================ Columnar Cipher Challenge ==============================*/
const exerciseFiveInputOne = document.getElementById("exerciseFiveInputTwo");
const exerciseFiveInputTwo = document.getElementById("exerciseFiveInputOne");
const exerciseFiveOutput = document.getElementById("exerciseFiveOutput");
const library = "abcdefghijklmnopqrstuvwxyz";
document.getElementById("exerciseFiveEncrypt").addEventListener("click", encrypt)
document.getElementById("exerciseFiveDecrypt").addEventListener("click", encrypt)
function encrypt() {
    var message = cleanWord(exerciseFiveInputOne.value);
    var keyword = cleanWord(exerciseFiveInputTwo.value);
    if (keyword.length < 2) { DisplayError(1); return; }
    if (message.length < 2) { DisplayError(2); return; }
    var keywordLength = keyword.length;
    while (message.length % keywordLength != 0) { message = message + "x" }
    var text = "";
    alphabet = 0;
    for (i = 0; i < keywordLength; i++) {
        while (alphabet < 26) {
            libraryKey = keyword.indexOf(library.charAt(alphabet));
            keywordArray = keyword.split("");
            keywordArray[libraryKey] = "_";
            keyword = keywordArray.join("");
            if (libraryKey >= 0) break;
            else alphabet++;
        }
        for (j = 0; j < message.length / keywordLength; j++) {
            text += message.charAt(j * keywordLength + libraryKey);
        }
    }
    exerciseFiveOutput.value = text;
}
function decrypt() {
    var message = cleanWord(exerciseFiveInputOne.value);
    var keyword = cleanWord(exerciseFiveInputTwo.value);
    if (keyword.length < 2) { DisplayError(1); return; }
    if (message.length < 2) { DisplayError(2); return; }
    var keywordLength = keyword.length;
    while (message.length % keywordLength != 0) { message = message + "x" }
    var text = "";
    var unorderedColumns = new Array(keywordLength);
    var newColumns = new Array(keywordLength);
    var outputText = "";
    var columnLengths = message.length / keywordLength;
    for (i = 0; i < keywordLength; i++) {
        unorderedColumns[i] = message.substr(i * columnLengths, columnLengths);
    }
    alphabet = 0;
    for (i = 0; i < keywordLength; i++) {
        while (alphabet < 26) {
            libraryKey = keyword.indexOf(library.charAt(alphabet));
            if (libraryKey >= 0) {
                newColumns[alphabet] = unorderedColumns[i++];
                keywordArray = keyword.split("");
                keywordArray[libraryKey] = "_";
                keyword = keywordArray.join("");
            }
            else alphabet++;
        }
        for (j = 0; j < message.length / keywordLength; j++) {
            text += message.charAt(j * keywordLength + libraryKey);
        }
    }
    exerciseFiveOutput.value = text;
}
function cleanWord(word){
    return word.toLowerCase().replace(/[^a-z]/g, "")
}
/*=========================================================================================*/

function DisplayError(type) {
    switch (type) {
        case 1:
            alert("Invalid Input")
            break;
        case 2:
            alert("Message incorrect, is missing padding")
            break;
    }
}





/*===================== Blackjack Challenge========================*/





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
        console.log(`Player${this.Owner.Id}`)
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
function Stand() {
    endGame(3)
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
    }
}

document.getElementById("exerciseSixDeal").addEventListener("click", dealButton)
document.getElementById("exerciseSixHit").addEventListener("click", hitButton)
/*==================================================================*/

/*UTILS*/
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