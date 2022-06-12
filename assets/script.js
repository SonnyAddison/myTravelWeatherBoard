var searchInfoEl = document.getElementById('searchInfo');
var pastSearchesEl = document.getElementById('pastSearches');
var cityInputEl = document.getElementById('city');
var stateInputEl = document.getElementById('state')
var countryInputEl = document.getElementById('country')
var searchReturnEl = document.getElementById('return');
var pastArray;

/* Set API Key to Const so that no one can change it */
const apiKey = '84e365eb6c0f563feed2e8ed0ff0400f'

/* Getting search varibles listed out together */
var queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + state + country + '&appid=' + apiKey;


var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    var state = stateInputEl.value.trim();
    var country = countryInputEl.value.trim();

    if (city&&state&&country) {
        newSearch(city&&state&&country);
        saveSearch(city&&state&&country);
        loadSaveSearch();
        
        searchReturnEl.textContent = '';

        cityInputEl.value = '';
        stateInputEl.value = '';
        countryInputEl.value = '';  
    } else {
        alert('Please enter a City, State, and Country');
    }
}

var buttonClickHandeler = function (event){
    var pastSearches = event.target.getAttribute('cityState');

    if (pastSearches) {
        getPastSearch(pastSearches);

        searchReturnEl.textContent = '';
    }
}

var newSearch = function () {

    fetch(queryURL)
        .then(response => {
            console.log(response)
     /*   })
        .then(function (data) {
            response.json().then(function () {
                displayReturn(data);
            })*/
    })
}

var getPastSearch = function (pastSearches) {
    fetch(queryURL).then(response => {
        console.log(response)
    })
   /* .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayReturn(data.items, pastSearches);
            })
        } else {
            alert('Error' + response.statusText);
        }
    })*/
}
/* Function just to display city header*/
function displayCity(data) {
    var todaysWeatherContainerEl = document.createElement('div');
    var cityHeaderEl = document.createElement('h3');

    var icon = "";
    if (data.weather[0].main === "Rain") {
        icon = " 🌧";
    }
    if (data.weather[0].main === "Clear") {
        icon = " 🌞";
    }
    if (data.weather[0].main === "Clouds") {
        icon = " ☁️";
    }
    if (data.weather[0].main === "Snow") {
        icon = " 🌨";
    }
    if (data.weather[0].main === "Thunderstorm") {
        icon = " ⛈️";
    }
    if (data.weather[0].main === "Drizzle") {
        icon = " 🌦";
    }
    if (data.weather[0].main === "Atmosphere") {
        icon = " 🌫";
    }
    ;

    cityHeaderEl.textContent = data.name + " (" + (moment().format("MM/DD/YYYY")) + ") " + data.weather[0].main + icon;

    todaysWeatherContainerEl.classList = 'today-weather-container';
    cityHeaderEl.classList = 'city-header';

    todaysWeatherContainerEl.appendChild(cityHeaderEl);
    weatherContainerEl.appendChild(todaysWeatherContainerEl);

}

function displayReturn(data) {
    var
}
searchInfoEl.addEventListener('submit', formSubmitHandler);
pastSearchesEl.addEventListener('click', buttonClickHandeler);

