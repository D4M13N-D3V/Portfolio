let binaryTreeTab = document.getElementById("binaryTreeTab")
let blackRedTreeTab = document.getElementById("blackRedTreeTab")
let trieTreeTab = document.getElementById("trieTreeTab")
let compressedTrieTreeTab = document.getElementById("compressedTrieTreeTab")

let binaryTreeContent = document.getElementById("binaryTreeContent")
let blackRedTreeContent = document.getElementById("blackRedTreeContent")
let trieTreeContent = document.getElementById("trieTreeContent")
let compressedTrieTreeContent = document.getElementById("compressedTrieTreeContent")

binaryTreeTab.addEventListener("click", openBinaryTreeTab)
blackRedTreeTab.addEventListener("click", openblackRedTreeTab)
trieTreeTab.addEventListener("click", openTrieTreeTab)
compressedTrieTreeTab.addEventListener("click", openCompressedTrieTab)

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
}
function openCompressedTrieTab() {
    currentTab.classList.remove("active")
    currentContent.style.display = "none"
    compressedTrieTreeTab.classList.add("active")
    compressedTrieTreeContent.style.display = "block"
    currentTab = compressedTrieTreeTab;
    currentContent = compressedTrieTreeContent;
    document.getElementById("exerciseTriTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryTreeCode").style.display = "none"
}
function openblackRedTreeTab() {
    currentTab.classList.remove("active")
    currentContent.style.display = "none"
    blackRedTreeTab.classList.add("active")
    blackRedTreeContent.style.display = "block"
    currentTab = blackRedTreeTab;
    currentContent = blackRedTreeContent;
    document.getElementById("exerciseTriTreeCode").style.display = "none"
    document.getElementById("exerciseBinaryTreeCode").style.display = "none"
}