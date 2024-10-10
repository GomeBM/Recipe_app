import React, { useEffect, useState } from "react";
import "./FilterSection.css";

const FilterSection = ({
  allRecipes,
  setAllRecipes,
  setIndividualRecipeLists,
  setRefresh, // Receive setRefresh from Homepage
  unfilteredRecipes, // Receive unfilteredRecipes from Homepage
}) => {
  const [ingredients, setIngredients] = useState([""]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    const fetchAllCuisines = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/recipes/get-cuisine-types`
        );
        const data = await response.json();
        setCuisines(data.cuisines);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchAllCuisines();
  }, []);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleFilter = () => {
    let filteredRecipes = unfilteredRecipes.filter((recipe) =>
      ingredients.some((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      )
    );

    if (selectedCuisine) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.nationality &&
          recipe.nationality.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    if (selectedDifficulty) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.difficulty &&
          recipe.difficulty.toLowerCase() ===
            selectedDifficulty.toLocaleLowerCase()
      );
    }

    setAllRecipes(filteredRecipes); // Filter the allRecipes list
    setIndividualRecipeLists(filteredRecipes); // Update individual recipe lists
  };

  const handleClearFilters = () => {
    setIngredients([""]);
    setSelectedCuisine(""); // Reset selected cuisine
    setSelectedDifficulty("");
    setAllRecipes([...unfilteredRecipes]); // Reset allRecipes
    setIndividualRecipeLists(unfilteredRecipes); // Reset individual recipe lists
    setRefresh((prev) => !prev); // Toggle refresh to force re-render
  };

  return (
    <div className="filter-section-container">
      <div className="all-filterby-sections">
        {/* Filter by Cuisine */}
        <div className="by-cuisine-container">
          <h3 className="by-cuisine-header">Filter by Cuisine Type</h3>
          <div className="cuisine-select-container">
            <label className="cuisine-label">Cuisine Type:</label>
            <select
              className="cuisine-select"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              <option value="">Any Cuisine</option>
              {cuisines.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="by-ingredients-container">
          <h3 className="by-ingredients-header">Filter by Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input-container">
              <label className="ingredient-label">
                Ingredient {index + 1}:
              </label>
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
          </div>
        </div>

        {/* Filter by Cuisine */}
        <div className="by-cuisine-container">
          <h3 className="by-cuisine-header">Filter by Difficulty</h3>
          <div className="cuisine-select-container">
            <label className="cuisine-label">Difficulty:</label>
            <select
              className="cuisine-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">Any Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
      <button className="remove-filter-button" onClick={handleClearFilters}>
        Clear All Filters
      </button>
      <button className="apply-filter-button" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSection;
