import React, { useEffect, useState } from "react";
import "./HomePage.css";
import RecipeCarousel from "../../components/RecipeCarousel";

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const fetchAllRecipesFromDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/recipes/get-all-recipes"
      );
      const data = await response.json();
      setAllRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipesFromDB();
  }, []);

  return (
    <div className="home-page-container">
      <div className="all-recipes-container">
        <h2 className="all-recipes-header">
          Here you can find all of our recipes:
        </h2>
        <RecipeCarousel recipes={allRecipes} />
      </div>
    </div>
  );
};

export default Homepage;
