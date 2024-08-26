import React, { useEffect, useState } from "react";
import "./HomePage.css";
import RecipeCard from "../../components/RecipeCard";

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const fetchAllRecipesFromDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/recipes/get-all-recipes"
      );
      const data = await response.json();
      setAllRecipes(data.recipes);
      console.log(allRecipes);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchAllRecipesFromDB();
  }, []);

  return (
    <div className="home-page-container">
      <h2>Here you can find all of our recipes:</h2>
      <div className="all-recipes-list">
        {allRecipes.length > 0 ? (
          allRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p>No recipes available.</p> // Optional: Message when no recipes are found
        )}
      </div>
    </div>
  );
};

export default Homepage;
