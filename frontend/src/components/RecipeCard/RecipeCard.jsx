import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card-container">
      <img
        className="recipe-card-img"
        src={recipe.image}
        alt="recipe image"
        loading="lazy"
      />
      <div className="recipe-card-text-container">
        <h2 className="recipe-card-name">{recipe.name}</h2>
        <h3 className="recipe-card-tags"> {recipe.nationality}</h3>
        <h3 className="recipe-card-difficulty">{recipe.difficulty}</h3>
      </div>
      <div className="recipe-card-buttons">
        <Link to={`/recipes/${recipe._id}`}>
          <button className="recipe-card-button">SHOW MORE DETAILS</button>
        </Link>
        <button className="recipe-card-button"> ADD TO FAVS</button>
      </div>
    </div>
  );
};

export default RecipeCard;
