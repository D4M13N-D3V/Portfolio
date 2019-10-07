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