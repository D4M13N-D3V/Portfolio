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

    fetch("https://random-word-api.herokuapp.com/word?key=MHK8HDTO&number=25")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            generatedTriTreeWords = data.sort();
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