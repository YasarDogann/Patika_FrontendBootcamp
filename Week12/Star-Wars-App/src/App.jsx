import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import StarshipList from './Starshiplist.jsx';
import StarshipDetail from './StarshipDetail.jsx';

const App = () => {
  const [starships, setStarships] = useState([]);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStarships();
  }, [page, searchTerm]);

  const fetchStarships = async () => {
    const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}&search=${searchTerm}`);
    setStarships(prevStarships => [...prevStarships, ...response.data.results]);
  };

  const loadMoreStarships = () => setPage(page + 1);

  return (
    <div className="app">
      <h1 className="title">STAR WARS</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Name / Model"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
          setStarships([]);
        }}
      />
      <button className="filter-button">Filter</button>
      {selectedStarship ? (
        <StarshipDetail starship={selectedStarship} goBack={() => setSelectedStarship(null)} />
      ) : (
        <StarshipList starships={starships} onStarshipClick={setSelectedStarship} loadMore={loadMoreStarships} />
      )}
    </div>
  );
};

export default App;
