import React from "react";
import { Link } from "react-router-dom";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>
        <Link to={`/products/${toy.id}`}>{toy.name}</Link>
      </h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      {toy.price !== undefined && toy.price !== "" && (
        <p className="product-price">${Number(toy.price).toFixed(2)}</p>
      )}
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => onLike(toy)}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={() => onDelete(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
