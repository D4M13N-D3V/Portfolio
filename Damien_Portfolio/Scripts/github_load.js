
var name = "";
var company = "";
var reponame = "";
var reposize = "";
var forks = "";
var subscribers = "";
window.addEventListener("load", function () {
    var table = document.getElementById("gtaRepo")
    fetch("https://api.github.com/repos/DamienTehDemon/Damiens-Roleplay-Project")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            table.insertAdjacentHTML("beforeend", "<li class='list-group-item'><b>Repository Name</b>  " + data.name + "</li>")
            table.insertAdjacentHTML("beforeend", "<li class='list-group-item'><b>Repository Size</b>  " + data.size/1000 + " megabytes</li>")
            table.insertAdjacentHTML("beforeend", "<li class='list-group-item'><b>Repository Forks</b>  " + data.forks + "</li>")
            table.insertAdjacentHTML("beforeend", "<li class='list-group-item'><b>Repository Subscribers</b>  " + data.subscribers_count + "</li>")
        });

    fetch("https://api.github.com/users/DamienTehDemon")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            name = data.name;
            table.insertAdjacentHTML("beforeend", "<li class='list-group-item'><b>Repository Creator</b>  " + name + "</li>")
        });
    document.getElementById("gtaRepo").addEventListener("click", function () {
        window.open("https://github.com/DamienTehDemon/Damiens-Roleplay-Project");
    })
})

