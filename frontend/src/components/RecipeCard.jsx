import React from "react";
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
      <h2 className="recipe-card-name">{recipe.name}</h2>
      <h3 className="recipe-card-tags"> {recipe.tags}</h3>
      <h3 className="recipe-card-difficulty">{recipe.difficulty}</h3>
      <button className="recipe-card-fav-button"> ADD TO FAVS</button>
    </div>
  );
};

export default RecipeCard;
