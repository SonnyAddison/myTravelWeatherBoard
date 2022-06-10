var searchInfoEl = document.getElementById('searchInfo');
var pastSearchesEl = document.getElementById('pastSearches');
var cityInputEl = document.getElementById('city');
/*var stateInputEl = document.getElementById('state');
var countryInputEl = document.getElementById('country')*/
var searchReturnEl = document.getElementById('return');

/* Set API Key to Const so that no one can change it */
const apiKey = '84e365eb6c0f563feed2e8ed0ff0400f'

/* Getting search varibles listed out together */
var queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;


var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
   /*var state = stateInputEl.value.trim();
    var country = stateInputEl.value.trim();*/

    if (city) {
        newSearch(city);
        
        searchReturnEl.textContent = '';
        cityInputEl.value = '';
        /*stateInputEl.value = '';
        countryInputEl.value = ''; */  
    } else {
        alert('Please enter a City');
    }
}

var buttonClickHandeler = function (event){
    var pastSearches = event.target.getAttribute('cityState');

    if (pastSearches) {
        getPastSearch(pastSearches);

        searchReturnEl.textContent = '';
    }
}

var newSearch = function (city) {

    fetch(queryURL)
        .then(response => {
            console.log(response);
        })
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayReturn(data, city);
            })
        } else {
            alert('Error ' + response.statusText);
        }
    })
}

var getPastSearch = function (pastSearches) {
    fetch(queryURL).then(response => {
        console.log(response)
    })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayReturn(data.items, pastSearches);
            })
        } else {
            alert('Error' + response.statusText);
        }
    })
}

var displayReturn = function (citySearch) {
    if(response.ok) {
       response.json().then(function (data) {
        displayReturn(data.items, citySearch)
       })
        return;
    }

searchReturnEl.textContent = citySearch;

for (var i = 0; i < response.lenth; i++){
    var cityName = document.createElement('div');
    cityN
 }
}
searchInfoEl.addEventListener('submit', formSubmitHandler);
pastSearchesEl.addEventListener('click', buttonClickHandeler);

