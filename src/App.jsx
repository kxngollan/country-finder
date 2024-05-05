import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Country from "./components/country/Country";

import SearchBar from "./components/search-bar/SearchBar";
import Search from "./components/search/Search";

const App = () => {
  return (
    <Router>
      <Header />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<Country />} />
        <Route path="/search/:name" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
