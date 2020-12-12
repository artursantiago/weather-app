let API_KEY = 'a8e71c9932b20c4ceb0aed183e6a83bb';

let resultWeather = null;

getWeatherData = city => {
  const URL = 'https://api.openweathermap.org/data/2.5/weather';

  const weatherPromisse = fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
  return weatherPromisse.then(response => response.json());
}

searchCity = () => {
  const city = document.querySelector('.city-input').value;

  getWeatherData(city)
  .then(result => {
    if (result.cod === '400')
      resultWeather = null
    else
      resultWeather = {
        weather: result.weather,
        temp: result.main.temp,
        humidity: result.main.temp,
        windSpeed: result.wind.speed,
        displayCity: `${result.name} - ${result.sys.country}`
      }
    
    showWeatherData(resultWeather);
  })
  .catch(error => {
    console.log(error);
  });
}

showWeatherData = (resultWeather) => {
  
  if (resultWeather === null) {
    document.querySelector('.info').style.display = 'none';
    return;
  } 

  document.querySelector('.info').style.display = 'flex';
  document.querySelector('.info').style.alignItens = 'center';
  document.querySelector('.info').style.justifyContent = 'center';
  console.log();
  document.querySelector('.weather-icon').setAttribute('src', `http://openweathermap.org/img/wn/${resultWeather.weather[0].icon}@4x.png`)
  document.querySelector('.weather-type').innerText = resultWeather.weather[0].main;
  document.querySelector('.display-city').innerText = resultWeather.displayCity;
  document.querySelector('.temp').innerText = resultWeather.temp + '°C';
  document.querySelector('.wind-speed').innerText = resultWeather.windSpeed + ' m/s';
  document.querySelector('.humidity').innerText = resultWeather.humidity + '%';

}