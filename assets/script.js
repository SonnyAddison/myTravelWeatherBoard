let searchInfoEl = document.getElementById('searchInfo');
let pastSearchesEl = document.getElementById('pastSearches');
let cityInputEl = document.getElementById('city');
let stateInputEl = document.getElementById('state');
let searchReturnEl = document.getElementById('return');

/* Set API Key to Const so that no one can change it */
const apiKey = '84e365eb6c0f563feed2e8ed0ff0400f'

/* Getting search varibles listed out together */
let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + state + '&exclude=minute,hourly,&appid=' + apiKey;

let formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    var state = stateInputEl.value.trim();

    if (city&&state) {
        fetch(queryURL);
        searchInfoEl.textContent ='';
        
    }
}


