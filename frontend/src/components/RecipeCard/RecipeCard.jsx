import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../UtilityFunctions";
import Popup from "../Popup/Popup";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, popUp }) => {
  const handleAddToFavs = async () => {
    try {
      const user = getUser();
      const response = await fetch("http://localhost:4000/user/add-to-favs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, recipeId: recipe._id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      popUp(recipe);
      // const data = await response.json();
      // setRecipe(data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };
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
        <button onClick={handleAddToFavs} className="recipe-card-button">
          {" "}
          ADD TO FAVS
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
