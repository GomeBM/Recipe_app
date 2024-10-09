import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../UtilityFunctions";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, popUp, removeAble, myOwn }) => {
  const [isAlreadyInFavs, setIsAlreadyInFavs] = useState(false);

  useEffect(() => {
    // Check if the recipe is already in the user's favorites list
    const checkIfInFavs = async () => {
      try {
        const user = getUser();
        const response = await fetch(
          "http://localhost:4000/user/my-fav-recipes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: user.id }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const isFav = data.fav_recipes.some(
          (fav) => fav.recipe._id === recipe._id
        );

        setIsAlreadyInFavs(isFav); // Update state based on whether the recipe is in the fav list
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkIfInFavs();
  }, [recipe._id]);

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

      const data = await response.json();
      setIsAlreadyInFavs(!data.isAlreadyInFavs); // Toggle the state based on the server response
      popUp(recipe, data.isAlreadyInFavs);
    } catch (error) {
      console.error("Error updating favorites:", error);
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
        {!myOwn && (
          <button onClick={handleAddToFavs} className="recipe-card-button">
            {isAlreadyInFavs ? "REMOVE FROM FAVS" : "ADD TO FAVS"}
          </button>
        )}
        {myOwn && (
          <button onClick={handleAddToFavs} className="recipe-card-button">
            DELETE RECIPE
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
