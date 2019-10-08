
const hourlyElement = document.getElementById("hourlyWeather")
const dayElement = document.getElementById("dayDisplay")
const summaryElement = document.getElementById("Summary")
const weatherIconElement = document.getElementById("weatherIcon")
const tempElement = document.getElementById("temp")
const apparentTempElement = document.getElementById("apparentTemp")
const humidityElement = document.getElementById("humidity")
const dewPointElement = document.getElementById("dewPoint")
const precipitationElement = document.getElementById("precipitation")
const windSpeedElement = document.getElementById("windSpeed")
window.addEventListener("load", HandleGeolocation)

function HandleGeolocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/aea2b7d88300e94b43ae169bc9aef033/${latitude},${longitude}`)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                let html = ''
                var d = new Date();
                var n = d.getHours();
                for (i = 1; i < 5; i++) {
                    let time = timeConverter(data.hourly.data[i].time)
                    html += `<div class="col-md-3" id="hourOneWeather">
                                <div class="row">
                                    <div class="col-md-12">
                                        <img src='Images/challenges/weatherIcons/${data.hourly.data[i].icon}.png'></img>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>${time.split(" ")[3]}:00</h4>
                                        <p>Feels Like ${data.hourly.data[i].apparentTemperature}°F</p>
                                        <p>(${data.hourly.data[i].apparentTemperature}°F)</p>
                                    </div>
                                </div>
                             </div>`
                }
                hourlyElement.innerHTML = html
                weatherIconElement.innerHTML = `<img src='Images/challenges/weatherIcons/${data.hourly.data[0].icon}.png'></img>`
                dayElement.innerHTML = '<h2>Today</h2>'
                summaryElement.innerHTML = `<h1>${data.hourly.data[0].summary}</h1>`
                tempElement.innerHTML = `<h6>Tempature</h6><p>${data.hourly.data[0].temperature}°F</p>`
                apparentTempElement.innerHTML = `<h6>Feels Like</h6><p>${data.hourly.data[0].apparentTemperature}°F</p>`
                humidityElement.innerHTML = `<h6>Humidity</h6><p>${data.hourly.data[0].humidity*100}%</p>`
                dewPointElement.innerHTML = `<h6>Dew Point</h6><p>${data.hourly.data[0].dewPoint}°F</p>`
                precipitationElement.innerHTML = `<h6>Precipitation</h6><p>Chance ${data.hourly.data[0].precipProbability}%</p>`
                windSpeedElement.innerHTML = `<h6>Wind Speed</h6><p>${data.hourly.data[0].windSpeed} mph</p>`
            });
    }

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ' ' + min+' '+sec;
        return time;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}