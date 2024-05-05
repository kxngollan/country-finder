import { useState, useEffect, Link } from "react";
import { useParams } from "react-router-dom";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const Country = () => {
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countryName } = useParams();

  const fetchCountry = async () => {
    setLoading(true);
    setError(null);
    setBorders([]);
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch data for ${countryName}`);
      }
      const data = await res.json();
      console.log(data[0]);
      setCountry(data[0]);
      const countryBorders = data[0].borders;
      if (countryBorders) {
        for (let i = 0; i < countryBorders.length; i++) {
          fetchBorder(countryBorders[i]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorder = async (country) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${country}`
      );
      const data = await res.json();
      console.log(data[0].name.common);
      setBorders((prevBorders) => [...prevBorders, data[0].name.common]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryName]);

  useDocumentTitle(country.name?.common || "Country Details");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <button onClick={() => window.history.back()}>Back</button>
      <div className="country-container">
        <img src={country.flags?.png} alt={`${country.name?.common} flag`} />
        <div>
          <h1>{country.name?.official}</h1>
          <div>
            <p>
              Native Name:{" "}
              {country.name?.nativeName
                ? Object.values(country.name?.nativeName)[0].official
                : null}
            </p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Sub Region: {country.subregion}</p>
            <p>Capital: {country.capital?.[0]}</p>
          </div>
          <div>
            <p>Top Level Domain: {country.tld?.[0]}</p>
            <p>Currencies: </p>

            <p>
              Languages:{" "}
              {country.languages
                ? Object.values(country.languages).map((lang) => lang)
                : null}
            </p>
          </div>
          <div>
            <p>Border Countries: </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Country;
