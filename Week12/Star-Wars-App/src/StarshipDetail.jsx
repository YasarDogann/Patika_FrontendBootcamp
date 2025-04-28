import React from 'react';

const StarshipDetail = ({ starship, goBack }) => (
  <div className="starship-detail">
    <button onClick={goBack} className="back-button">←</button>
    <h2>{starship.name}</h2>
    <img src="/uzaygemisi.jpeg" alt="Starship" className="starship-detail-image" />
    <p><strong>Model:</strong> {starship.model}</p>
    <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
    <p><strong>Passengers:</strong> {starship.passengers}</p>
    <p><strong>Max Atmosphering Speed:</strong> {starship.max_atmosphering_speed}</p>
    <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
    <p><strong>Crew:</strong> {starship.crew}</p>
    <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
  </div>
);

export default StarshipDetail;
