import { useEffect, useState } from "react";
import "./Home.css";
import SearchBar from "../search-bar/SearchBar";
import CountryCard from "../card/CountryCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countriesPerPage] = useState(25);
  const [pages, setPages] = useState([]);

  // Helper function to paginate the countries data
  const paginate = (data, pageSize) => {
    return data.reduce((acc, val, i) => {
      let idx = Math.floor(i / pageSize);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  };

  const fetchCountry = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await res.json();
      console.log(data);
      setPages(paginate(data, countriesPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountry();
    document.title = "Country Finder";
  }, []);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <SearchBar />
      <div className="container">
        <h1>Countries</h1>
        <div className="countries">
          {pages[currentPage]?.map((country, i) => (
            <Link key={i} to={`/country/${country.name.common}`}>
              <CountryCard country={country} />
            </Link>
          ))}
        </div>
        <div className="pagination">
          {pages.map((_, index) => (
            <button key={index} onClick={() => goToPage(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
