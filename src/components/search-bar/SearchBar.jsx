import { useNavigate, Link } from "react-router-dom";
import "./SearchBar.css";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchSearch = async (text) => {
    if (!text) return;
    setError(null);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${text}`);
      const data = await res.json();
      if (!res.ok) throw new Error("No Country Found");
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
      setCountries([]);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const handleBodyClick = (e) => {
      if (e.target.className !== "search") setShow(false);
    };

    body.addEventListener("click", handleBodyClick);

    return () => {
      body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    setShow(searchText.length > 0);
    fetchSearch(searchText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    console.log("searching");
    navigate(`search/${search}`);
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            value={search}
          />
          <button type="submit">search</button>
        </form>
      </div>
      {show ? (
        <div className="countries-search">
          {/* Error Handler */}
          {error ? <div className="country-list">{error}</div> : null}
          {/* Show country list */}
          {countries.length > 0
            ? countries.map((country, i) => (
                <div className="country-list" key={country.cca3 || i}>
                  <Link to={`/country/${country.name.common}`}>
                    {country.name.official}
                  </Link>
                </div>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
