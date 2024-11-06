const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');
const apiKey = '9181fec7f545edcb76efb9016190eeb5';

weatherForm.addEventListener('submit', async event => {
  event.preventDefault();

  const city = cityInput.value;
  if (city){
    try {
      const weatherData = await getWeatherInfo(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      alert(error)
    }
  }else{
    alert("Enter a city");
  }

})

async function getWeatherInfo(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok){
    alert('Could not fetch weather data');
  }
  return await response.json();
}

function displayWeatherInfo(data){

  const {name:city, main:{temp, humidity}, weather : [{description, id}] } = data;

  card.textContent = '';
  card.style.display = 'flex';

  const cityDisplay = document.createElement('h1')
  cityDisplay.textContent = city;
  card.appendChild(cityDisplay);

  const tempDisplay = document.createElement('p')
  tempDisplay.textContent = (temp-273.15).toFixed(null)+' C';
  tempDisplay.classList.add('temp')
  card.appendChild(tempDisplay);

  const humDisplay = document.createElement('p')
  humDisplay.textContent = 'humidity: '+humidity+'%';
  card.appendChild(humDisplay);

  const descDisplay = document.createElement('p')
  descDisplay.textContent = description;
  card.appendChild(descDisplay);

  const emojiDisplay = document.createElement('p');
  emojiDisplay.textContent = getWeatherEmoji(id);
  emojiDisplay.classList.add('emoji');
  card.append(emojiDisplay);
}

function getWeatherEmoji(id){
  switch(true){
    case(id>=200 && id < 300):
      return '⛈️';
    case(id>=300 && id < 600):
      return '🌧️';
    case(id>=600 && id < 700):
      return '❄️';
    case(id>=700 && id < 800):
      return '🌫️';
    case(id==800):
      return '☀️';
    case(id>=801 && id<810):
      return '☁️';
  }
}

