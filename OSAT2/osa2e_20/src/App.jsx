import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [fiilter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log("effect run, country is now", countries); // eka tyhjä, sitten kaikki

  useEffect(() => {
    //Vasta ensimmäisen renderöinnin JÄLKEEN??
    //useEffect ajetaan komponentin latautuessa ensimmäistä kertaa, ([] tarkoittaa, että efekti suoritetaan vain kerran).
    //sisäinen funktio, jota React ajaa erikseen renderöinnin jälkeen.
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null); // nollaa valitun maan
  };

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(fiilter.toLowerCase())
  );

  const countryToDisplay =
    selectedCountry ||
    (countriesToShow.length === 1 ? countriesToShow[0] : null);

  return (
    <div>
      <h1>Countries</h1>
      find countries: <input value={fiilter} onChange={handleChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 0 ? (
        <p>No results</p>
      ) : /*) : countriesToShow.length === 1 ? */
      countryToDisplay ? (
        <div>
          <h2>{countryToDisplay.name.common}</h2>
          <p>Capital: {countryToDisplay.capital}</p>
          <p>Area: {countryToDisplay.area}</p>
          <h3>Languages</h3>
          <ul>
            {" "}
            {Object.values(countryToDisplay.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={countryToDisplay.flags.png}
            alt={`Flag ${countryToDisplay.name.common}`}
          />
        </div>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
