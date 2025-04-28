import React from 'react';

const StarshipList = ({ starships, onStarshipClick, loadMore }) => (
  <div className="starship-list">
    {starships.map((starship) => (
      <div key={starship.name} className="starship-card" onClick={() => onStarshipClick(starship)}>
        <img src="/uzaygemisi.jpeg" alt="Starship" className="starship-image" />
        <h3>{starship.name}</h3>
        <p>Model: {starship.model}</p>
        <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
      </div>
    ))}
    <button onClick={loadMore} className="load-more-button">Load More</button>
  </div>
);

export default StarshipList;
