import "./Country.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../loader/Loader";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Country Finder`;
  }, [title]);
};

const Country = () => {
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

      console.log(data[0].currencies);

      const countryBorders = data[0].borders;

      let infoArray = [];
      if (countryBorders) {
        for (let i = 0; i < countryBorders.length; i++) {
          try {
            const res = await fetch(
              `https://restcountries.com/v3.1/alpha/${countryBorders[i]}`
            );
            const info = await res.json();

            infoArray.push(info[0].name.common);
          } catch (err) {
            console.error(err);
          }
        }
      }
      setBorders(infoArray);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryName]);

  useDocumentTitle(country.name?.common || "Country Details");

  const borderClick = (border) => {
    navigate(`/country/${border}`);
  };

  if (loading) return <Loader />;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <button onClick={() => window.history.back()}>Back</button>
      <div className="country-container">
        <div className="image-container">
          <img
            className="main-flag"
            src={country.flags?.png}
            alt={`${country.name?.common} flag`}
          />
        </div>
        <div className="info-container">
          <h1>{country.name?.official}</h1>
          <div className="information">
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
              <p
                onClick={() =>
                  console.log(Object.keys(country.currencies)[0].name)
                }
              >
                Currencies: {country.currencies?.[0]?.name}
              </p>

              <p>
                Languages:{" "}
                {country.languages
                  ? Object.values(country.languages).map((lang) => `${lang} `)
                  : null}
              </p>
            </div>
          </div>
          {borders.length > 0 ? (
            <div className="border">
              <p>Border Countries: </p>
              {borders.map((border, i) => (
                <p
                  key={i}
                  className="border-country"
                  onClick={() => borderClick(border)}
                >
                  {border}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Country;
