import React, { useState } from "react";
import "./FilterSection.css";

const FilterSection = ({
  allRecipes,
  setAllRecipes,
  setIndividualRecipeLists,
  setRefresh, // Receive setRefresh from Homepage
  unfilteredRecipes, // Receive unfilteredRecipes from Homepage
}) => {
  const [ingredients, setIngredients] = useState([""]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleFilter = () => {
    const filteredRecipes = unfilteredRecipes.filter((recipe) =>
      ingredients.some((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      )
    );

    setAllRecipes(filteredRecipes); // Filter the allRecipes list as well
    setIndividualRecipeLists(filteredRecipes);
  };

  const handleClearFilters = () => {
    setIngredients([""]);
    setAllRecipes([...unfilteredRecipes]); // Reset allRecipes list using unfilteredRecipes
    setIndividualRecipeLists(unfilteredRecipes); // Reset breakfast, lunch, and dinner lists
    setRefresh((prev) => !prev); // Toggle refresh state to force re-render
  };

  return (
    <div className="filter-section-container">
      <div className="by-ingredients-container">
        <h3 className="by-ingredients-header">Search by Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input-container">
            <label className="ingredient-label">Ingredient {index + 1}:</label>
            <input
              className="ingredient-input"
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="by-ingredients-buttons-container">
          <button className="filter-button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <button className="filter-button" onClick={handleFilter}>
            Filter by Ingredients
          </button>
          <button className="filter-button" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
