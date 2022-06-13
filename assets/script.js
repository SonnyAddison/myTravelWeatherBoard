/*Global*/
var searchInfoEl = document.getElementById('searchInfo');
var pastSearchesEl = document.getElementById('pastSearches');
var cityInputEl = document.getElementById('city');
var stateInputEl = document.getElementById('state');
var countryInputEl = document.getElementById('country');
var searchReturnEl = document.getElementById('return');

/* Set API Key to Const so that no one can change it */
const apiKey = '84e365eb6c0f563feed2e8ed0ff0400f'

 /* setting up for new search information*/
var forsubmitHandler = function (event) {
  event.preventDefault ();

  var city = cityInputEl.value.trim();
  var state = stateInputEl.value.trim();
  var country = countryInputEl.value.trim();

  if (city&&state&&country) {
    getCity(city&&state&&country);
    saveSearch(city&&state&&country);
    pastSearchBtns();

    searchReturnEl.textContent = data.weather.tempurature
    cityInputEl.value = '';
  } else {
    alert('Please enter valid City, Stae, and Country');
  }
}

/* funchtion to call by City, State, and Country so right city is located*/
var getCity = function (city,state,country) {
  var queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + state + country + '&appid=' + apiKey;

  fetch(queryURL)
  .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
              console.log(data);
              /* display the city name*/
              displayCity(data);
              /* Get coordintaes from this data which will then be convertede for more data availability*/
              getLatLong(data.coord.lat, data.coord.lon);
          });
      } else {
          alert('Error: ' + response.statusText);
      }
  })
  .catch(function (error) {
      alert('Unable to connect to Open Weather');
  });

};

function getLatLong(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;

  fetch(queryURL)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data) {
                  console.log(data);
                  /*display current weather div */
                  returnCurrentDay(data);
                  /*display five day forecast div */
                  returnFiveDay(data);
              });
          }
      });
}

/*building out past searches buttons*/
function pastSearchBtns(cityName) {
  var lastSearchBtnEl = document.createElement('button');
  lastSearchBtnEl.textContent = cityName;
  lastSearchBtnEl.classList = 'btn city-button';
  lastSearchBtnEl.style = "text-transform: capitalize";
  lastSearchBtnEl.dataset.city = cityName;
  cityButtonsContainerEL.appendChild(oldCityButtonEl);
  lastSearchBtnEl.addEventListener('click', function() {
      var thisCity = this.getAttribute('data-city');
      clearPage();
      getCity(thisCity);
  })
}

/* Setting up for looking at past searches */
var buttonClickHandler = function (event) {
  event.preventDefault ();

  var pastSearch = event.target.getAttribute('savedCity');

  if (pastSearch) {
    getApi(pastSearch);

    searchReturnEl.textContent = "";
  }
}

/*Past Searches Area*/
function cityStateButton(cityName) {
  var cityStateBtnEl = document.createElement('button');
  cityStateBtnEl.textContent = cityName;
  cityStateBtnEl.classList = 'pastBtn';
  cityStateBtnEl.style = "text-transform: capitalize";
  cityStateBtnEl.dataset.city = cityName;
  cityStateBtnEl.appendChild(cityStateBtnEl);
  cityStateBtnEl.addEventListener('click', function() {
      var thisCity = this.getAttribute('data-city');
      clearPage();
      getCityData(thisCity);
  })
}

// Function just to display city header
function displayCity(data) {
  var newSearchContainerEl = document.createElement('div');
  var cityNameEl = document.createElement('h3');   
  
  cityHeaderEl.textContent = data.name + " (" + (moment().format("MM/DD/YYYY")) + ") " + data.weather[0].main;

  newSearchContainerEl.classList = 'returnArea';
  cityNameEl.classList = 'returnCity';

  newSearchContainerEl.appendChild(cityNameEl);
  searchReturnEl.appendChild(newSearchContainerEl);

}

// Function to display weather just for today from One Api call
function returnCurrentDay(data) {
  var cityNameEl = document.querySelector('.cityName');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');
  var uvIndexEl = document.createElement('button');

  tempEl.textContent = "Temperature: " + data.current.temp + " °F";;
  windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
  humidityEl.textContent = "Humidity: " + data.current.humidity + " %";
  uvIndexEl.textContent = "UV Index: " + data.current.uvi;

  uvIndexEl.classList = 'uv-index'

  cityNameEl.appendChild(tempEl);
  cityNameEl.appendChild(windEl);
  cityNameEl.appendChild(humidityEl);
  cityNameEl.appendChild(uvIndexEl);
  changeUviColor(data);
};

function uviColor(data) {
  var uvIndexEl = document.querySelector('.uv-index');
  var uvi = data.current.uvi;
  // Low UV
  if (uvi <= 3) {
      uvIndexEl.style.backgroundColor = 'green';
      uvIndexEl.style.color = "white";
      uvIndexEl.style.width = "10rem";
  }
  // Moderate UV
  if (uvi > 3 && uvi <= 6) {
      uvIndexEl.style.backgroundColor = 'yellow';
      uvIndexEl.style.color = "black";
      uvIndexEl.style.width = "10rem";
  }
  // High UV
  if (uvi > 6) {
      uvIndexEl.style.backgroundColor = 'red';
      uvIndexEl.style.color = "white";
      uvIndexEl.style.width = "10rem";
  }
}

function displayFiveDayForecast(data) {
  var fiveDayContainerEl = document.createElement('div');
  var fiveDayHeaderEl = document.createElement('h2');
  var fiveDaysOnlyBoxEl = document.createElement('div');

  fiveDayHeaderEl.textContent = "5 Day Forecast";

  fiveDayContainerEl.classList = 'fiveday-container';
  fiveDayHeaderEl.classList = 'fiveday-header';
  fiveDaysOnlyBoxEl.classList = 'fivedaysonly-box';

  fiveDayForecastContainerEl.appendChild(fiveDayHeaderEl);
  fiveDayForecastContainerEl.appendChild(fiveDaysOnlyBoxEl);
  weatherContainerEl.appendChild(fiveDayForecastContainerEl);

  //Daily forecast array for 5 upcoming days: 
  var dayArray = [0, 1, 2, 3, 4]
  for (var i = 0; i < dayArray.length; i++) {
      var dayContainerEl = document.createElement('div');
      var dateEl = document.createElement('p');  
      var iconEl = document.createElement('p');  //(data.daily[i].weather[0].main);
      var tempEl = document.createElement('p');  //(data.daily[i].temp);
      var windEl = document.createElement('p');  //(data.daily[i].wind_speed);
      var humidityEl = document.createElement('p');  //(data.daily[i].humidity);

      var icon = "";
      if (data.daily[i].weather[0].main === "Rain") {
          icon = "🌧";
      }
      if (data.daily[i].weather[0].main === "Clear") {
          icon = "🌞";
      }
      if (data.daily[i].weather[0].main === "Clouds") {
          icon = "☁️";
      }
      if (data.daily[i].weather[0].main === "Snow") {
          icon = "🌨";
      }
      if (data.daily[i].weather[0].main === "Thunderstorm") {
          icon = "⛈️";
      }
      if (data.daily[i].weather[0].main === "Drizzle") {
          icon = " 🌦";
      }
      if (data.daily[i].weather[0].main === "Atmosphere") {
          icon = "🌫";
      }
      ;

      var dayForward = "";
      var dayForwardArray = [1, 2, 3, 4, 5]
      dayForward = moment().add((dayForwardArray[i]), 'days').format("MM/DD/YYYY");
      // lookup units timestamp to convert date data from seconds as another way

      dateEl.textContent = dayForward;
      // Tip: to call array item if different from starting at 0 can be: ex. data.list[(dayArray[i])].wind.speed 
      iconEl.textContent = icon + " " + data.daily[i].weather[0].main;
      tempEl.textContent = "Temp: " + data.daily[i].temp.day + " °F";
      windEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " %";

      dayContainerEl.classList = 'day-container';

      dayContainerEl.appendChild(dateEl);
      dayContainerEl.appendChild(iconEl);
      dayContainerEl.appendChild(tempEl);
      dayContainerEl.appendChild(windEl);
      dayContainerEl.appendChild(humidityEl);
      fiveDaysOnlyBoxEl.appendChild(dayContainerEl);
  }

}

searchInfoEl.addEventListener('sumit', forsubmitHandler);
