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