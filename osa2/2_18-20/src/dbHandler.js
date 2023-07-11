import axios from 'axios';

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
   let tulos = await axios.get(baseUrl + "/all");
   return tulos;
}

const getCapitalWeather = async country => {
   let key = process.env.REACT_APP_WEATHER_API_KEY;
   let latitude = country.latlng[0];
   let longtitude = country.latlng[1];

   var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}&units=metric`;
   let req = await axios.get(weatherURL).then(a => a.data);
   return req;
}

export { getAll, getCapitalWeather };