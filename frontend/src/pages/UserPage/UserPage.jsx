import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserPage.css";
import RecipeCarousel from "../../components/RecipeCarousel/RecipeCarousel";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/recipes/get-by-id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: id }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);
  return (
    <div className="user-page-container">
      UserPage
      <div className="all-recipes-container">
        <h2 className="all-recipes-header">All of our recipes:</h2>
        <RecipeCarousel recipes={allRecipes} />
      </div>
    </div>
  );
};

export default UserPage;
