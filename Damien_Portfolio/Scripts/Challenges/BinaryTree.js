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