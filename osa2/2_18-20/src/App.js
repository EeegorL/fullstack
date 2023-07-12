import { useEffect, useState } from "react";
import "../src/index.css";
import { getAll, getCapitalWeather } from "./dbHandler.js";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryToShow, setCountryToShow] = useState([]);

  useEffect(() => {
    getAll().then(fetchedCountries => setAllCountries(fetchedCountries.data)); //fetches all countries and sets them in a variable for later use
  }, []);

  return (
    <div>
      <h1 className="header">Maat ja säät</h1>
      <div className="body">
        <Filtteri setFilter={setFilter} setCountryToShow={setCountryToShow} />
        <CountriesList countries={allCountries} filter={filter} countryToShow={countryToShow} setFilter={setFilter} setCountryToShow={setCountryToShow} />
      </div>
    </div>
  );
}

const Filtteri = ({ setFilter, setCountryToShow }) => {
  return <p>Filtteri <input onChange={event => setFilter(event.currentTarget.value)} onFocus={e => clearFilter(e, setFilter, setCountryToShow)} /></p>
}


const CountriesList = ({ countries, filter, countryToShow, setFilter, setCountryToShow }) => {
  let countriesToShow = [];

  if (countryToShow.length >= 1) {
    highlightedCountryName(countryToShow[0].name.common.toLowerCase(), filter.toLowerCase());

    return <CountryInfo country={countryToShow[0]} /> //if user has pressed the button to select a singular country to be showed 
  }
  if (filter.length == 0) { //if user has not entered a filter
    return <p>Hae maita syöttämällä maan nimi</p>
  }
  else {
    for (let country of countries) {
      if (country.name.common.toLowerCase().includes(filter.toLowerCase())) countriesToShow.push(country);
    }

    if (countriesToShow.length > 10) { //if there are too many countries to show
      return <p>Tarkenna hakuehtoa</p>
    }
    else {
      if (countriesToShow.length == 1) { //if there is only one country that suits the filter
        let country = countriesToShow[0];
        return <CountryInfo country={country} />
      }

      else {
        return countriesToShow.map(country => { //else show ten or less suitable countries
          return <div key={country.cca2}
            onClick={() => showCountryInfo({ countries, country, setFilter, setCountryToShow })}
            className={"countryButton"}>
            {highlightedCountryName(country.name.common, filter)}</div>
        })
      }
    }
  }
}


const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [weatherMainData, setWeatherMainData] = useState([]);

  useEffect(() => {
    getCapitalWeather(country).then(weatherData => setWeather(weatherData));
    getCapitalWeather(country).then(weatherData => setWeatherMainData(weatherData.weather[0])); // idk, I was doing this at midnight and this worked. praise the midnight madness
  }, [country]);

  if (country.name.common != "Antarctica") { // yes because Antarctica doesn't have ANYTHING, like really no capital, no official languages. It barely even exists

    let countryNativeName = ("nativeName" in country.name) //if country has a native name...
      ? (Object.values(country.name.nativeName)[0].common == country.name.common) //...and the native name is not the same as the country's common name
        ? "" //empty
        : `, "${Object.values(country.name.nativeName)[0].common}"` //country's native name
      : ""; //empty

    let countryLanguages = Object.values(country.languages);

    return <div>
      <h1>{country.name.common}
        {countryNativeName}
      </h1> {/*show country's "universal name" along with possible native name */}

      <span>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Total area: {country.area} km²</p>
        <img className="imgNextToText" src={country.flags.png} alt={country.flags.alt} />
      </span>

      <h2>Languages</h2>
      <ul>{countryLanguages.map(language => {
        return <li key={language}>{language}</li>
      })}</ul>

      <h2>Weather in {country.capital}</h2>
      <p>{Math.round(weather.main?.temp)}°C, {weatherMainData.main}
        <img src={`https://openweathermap.org/img/wn/${weatherMainData?.icon}.png`} className="weatherIcon" alt="rgdgfd" />
      </p>
    </div>
  }

  else { //Antarctica-thing
    return <div>
      <h1>{country.name.common}</h1>

      <span>
        <p>No capital </p>
        <p>Population: {country.population}</p>
        <p>Total area: {country.area} km²</p>
        <img className="imgNextToText" src={country.flags.png} alt={country.flags.alt} />
      </span>

      <h2>No official languages</h2>

      <h2>Weather in {country.name.common}</h2>
      <p>{Math.round(weather.main?.temp)}°C, {weatherMainData.main}
        <img src={`https://openweathermap.org/img/wn/${weatherMainData?.icon}.png`} className="weatherIcon" alt="" /> </p>
    </div>
  }
}

const showCountryInfo = ({ countries, country, setCountryToShow }) => { //used for the show-buttons
  let foundCountry = countries.filter(obj => obj.cca2 == country.cca2 && obj.cca3 == country.cca3); /*searches for the specific countries by both cca2 and cca3, because some countries,*/
  setCountryToShow(foundCountry);                                                                   /*e.g USA's archipelagos, can have the same cca2 or cca3, but not both */
}

const clearFilter = (event, setFilter, setCountryToShow) => { //clears filter and possible selected country
  setFilter(event.target.value);
  setCountryToShow([]);
}

const highlightedCountryName = (text, partToHighlight) => { //highlights the searched part on found countries
  let highlightStart = text.toLowerCase().indexOf(partToHighlight);
  let highlightEnd = highlightStart + partToHighlight.length;

  let stringStart = text.substring(0, highlightStart);
  let highlightedPart = text.substring(highlightStart, highlightEnd);
  let stringEnd = text.substring(highlightEnd, text.length);

  return <p>{stringStart}<span className={"highlight"}>{highlightedPart}</span>{stringEnd}</p>
}

export default App;
