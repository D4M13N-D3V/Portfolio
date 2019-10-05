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

    this.GetPrettyString = function () {
        this.prettyString = ""
        this.PrintPretty();
    }
}

GeneratedNumbers = []
GeneratedNumberOutput = document.getElementById("exerciseEightGeneratedNumbers")
CreateBinaryTreeButton = document.getElementById("exerciseEightBinaryTree")
GenerateNumberButton = document.getElementById("exerciseEightGenerate")
JsonViewer = document.getElementById("jsonViewer")
GenerateNumberButton.addEventListener("click", GenerateNumbers)
CreateBinaryTreeButton.addEventListener("click", CreateBinaryTree)
window.addEventListener("load", GenerateNumbers)


function GenerateNumbers() {
    GenerateNumbers = []
    for (i = 0; i < 25; i++) {
        do {
            rdm = math.floor(math.random() * 100) + 1;
        }
        while (GeneratedNumbers.indexOf(rdm) != -1)
        GeneratedNumbers.push(rdm)
    }
    var text = ""
    for (i = 0; i < GeneratedNumbers.length; i++) text += GeneratedNumbers[i] + ","
    text = text.substr(0, text.length - 1)
    GeneratedNumberOutput.innerHTML = text;
}

function CreateBinaryTree() {
    if (JsonViewer.childNodes.length>0) JsonViewer.removeChild(JsonViewer.childNodes[0])
    var testTree = new BinaryTree()
    for (i = 0; i < GeneratedNumbers.length; i++) {
        testTree.Add(GeneratedNumbers[i])
    }
    var jsonViewer = new JSONViewer();
    JsonViewer.appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(JSON.parse(JSON.stringify(testTree.root)), -1, -1);
}