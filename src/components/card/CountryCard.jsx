import "./CountryCard.css";

import PropTypes from "prop-types";

const CountryCard = ({ country }) => {
  return (
    <div className="card">
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        className="card-flag"
      />

      <div>
        <h3>{country.name.common}</h3>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
      </div>
    </div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.object,
};

export default CountryCard;
