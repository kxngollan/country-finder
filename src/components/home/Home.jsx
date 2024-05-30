import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import SearchBar from "../search-bar/SearchBar";
import CountryCard from "../card/CountryCard";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countriesPerPage] = useState(24);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await res.json();

      setPages(paginate(data, countriesPerPage));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
    document.title = "Country Finder";
  }, []);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SearchBar />
      <div>
        <h1>Countries</h1>
        <div className="container">
          <div className="countries">
            {pages[currentPage]?.map((country, i) => (
              <Link key={i} to={`/country/${country.name.common}`}>
                <CountryCard country={country} />
              </Link>
            ))}
          </div>
          <div className="pagination">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={index === currentPage ? `activePage` : null}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
