
oneCode = document.getElementById("exerciseOneCode")
twoCode = document.getElementById("exerciseTwoCode")
threeCode = document.getElementById("exerciseThreeCode")
fourCode = document.getElementById("exerciseFourCode")
fiveCode = document.getElementById("exerciseFiveCode")
sixCode = document.getElementById("exerciseSixCode")
binaryTreeCode = document.getElementById("exerciseBinaryTreeCode")
sevenCode = document.getElementById("exerciseSevenCode")
triTreeCode = document.getElementById("exerciseTriTreeCode")
document.getElementById("exerciseOneToggle").addEventListener("click", openOneCode)
document.getElementById("exerciseTwoToggle").addEventListener("click", openTwoCode)
document.getElementById("exerciseThreeToggle").addEventListener("click", openThreeCode)
document.getElementById("exerciseFourToggle").addEventListener("click", openFourCode)
document.getElementById("exerciseFiveToggle").addEventListener("click", openFiveCode)
document.getElementById("exerciseSixToggle").addEventListener("click", openSixCode)
document.getElementById("exerciseBinaryTreeToggle").addEventListener("click", openBinaryCode)
document.getElementById("exerciseSevenToggle").addEventListener("click", openSevenCode)
document.getElementById("exerciseTriTreeToggle").addEventListener("click", openTriCode)
function openOneCode() {
    if (oneCode.style.display == "none") oneCode.style.display = "block";
    else oneCode.style.display = "none"
}
function openTwoCode() {
    if (twoCode.style.display == "none") twoCode.style.display = "block";
    else twoCode.style.display = "none"
}
function openThreeCode() {
    if (threeCode.style.display == "none") threeCode.style.display = "block";
    else threeCode.style.display = "none"
}
function openFourCode() {
    if (fourCode.style.display == "none") fourCode.style.display = "block";
    else fourCode.style.display = "none"
}
function openFiveCode(){
    if (fiveCode.style.display == "none") fiveCode.style.display = "block";
    else fiveCode.style.display = "none"
}
function openSixCode(){
    if (sixCode.style.display == "none") sixCode.style.display = "block";
    else sixCode.style.display = "none"
}
function openSevenCode(){
    if (sevenCode.style.display == "none") sevenCode.style.display = "block";
    else sevenCode.style.display = "none"
}
function openBinaryCode(){
    if (binaryTreeCode.style.display == "none") binaryTreeCode.style.display = "block";
    else binaryTreeCode.style.display = "none"
}
function openTriCode(){
    if (triTreeCode.style.display == "none") triTreeCode.style.display = "block";
    else triTreeCode.style.display = "none"
}