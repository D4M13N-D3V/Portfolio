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