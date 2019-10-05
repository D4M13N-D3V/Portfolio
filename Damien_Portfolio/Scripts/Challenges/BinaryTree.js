﻿function BinaryTree() {
    this.root = undefined;

    function Node(value, parent) {
        this.value = value;
        this.parent = parent;
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
            console.log(result.side)
            if (result.side == "left") {
                newNode.parent = result.parent;
                newNode.parent.left = newNode
            }
            else if (result.side == "right") {
                newNode.parent = result.parent;
                newNode.parent.right = newNode
            }
        }
        else throw new Error("Invalid Argument ( Two Items Of Same Value )")
    }

    this.Search = function (value) {
        return this.Traverse(value).found;
    }

    this.Debug = function () {
        console.log(this.root)
    }
}
Test()
function Test() {

    var testTree = new BinaryTree()
    var numbers = [22,95,23,38,53,1,5,9,2,96]
    for (i = 0; i < numbers.length; i++) {
        testTree.Add(numbers[i])
    }
    testTree.Debug()
}