import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CountryCard from "../card/CountryCard";
import SearchBar from "../search-bar/SearchBar";
import Loader from "../loader/Loader";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [countriesPerPage] = useState(25);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { name } = useParams();

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
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await res.json();
      console.log(data);
      setPages(paginate(data, countriesPerPage));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [name]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loader />;

  return (
    <>
      <SearchBar />
      <div>
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
    </>
  );
};

export default Search;
