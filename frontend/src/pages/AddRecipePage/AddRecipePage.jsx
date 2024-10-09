import React, { useState, useEffect } from "react";
import { getUser } from "../../UtilityFunctions";
import "./AddRecipePage.css";

export const AddRecipePage = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: [""],
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    difficulty: "",
    nationality: "",
    tags: [""],
    image: "",
    mealType: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const connectedUser = getUser();
    setUser(connectedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, e, fieldName) => {
    const newArray = [...recipe[fieldName]];
    newArray[index] = e.target.value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [fieldName]: newArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user.id;
      const response = await fetch("http://localhost:4000/user/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...recipe, userId }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "Recipe added successfully!");
        setRecipe({
          name: "",
          ingredients: [""],
          instructions: [""],
          prepTimeMinutes: "",
          cookTimeMinutes: "",
          difficulty: "",
          nationality: "",
          tags: [""],
          image: "",
          mealType: "",
        });
      } else {
        const result = await response.json();
        setError(result.error || "Error adding recipe. Please try again.");
      }
    } catch (err) {
      console.error("Error adding recipe:", err);
      setError(err.message || "Error adding recipe. Please try again.");
    }
  };

  const addArrayField = (fieldName) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [fieldName]: [...prevRecipe[fieldName], ""],
    }));
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2>Please fill out the form to add a new recipe</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label>
          <span>Recipe Name:</span>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Ingredients:</span>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(index, e, "ingredients")}
              required
            />
          ))}
          <button
            className="add-field-button"
            type="button"
            onClick={() => addArrayField("ingredients")}
          >
            Add Ingredient
          </button>
        </label>

        <label>
          <span>Instructions:</span>
          {recipe.instructions.map((instruction, index) => (
            <input
              key={index}
              type="text"
              value={instruction}
              onChange={(e) => handleArrayChange(index, e, "instructions")}
              required
            />
          ))}
          <button
            className="add-field-button"
            type="button"
            onClick={() => addArrayField("instructions")}
          >
            Add Instruction
          </button>
        </label>

        <label>
          <span>Preparation Time (minutes):</span>
          <input
            type="number"
            name="prepTimeMinutes"
            value={recipe.prepTimeMinutes}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            name="cookTimeMinutes"
            value={recipe.cookTimeMinutes}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Difficulty:</span>
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label>
          <span>Nationality:</span>
          <input
            type="text"
            name="nationality"
            value={recipe.nationality}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Tags:</span>
          {recipe.tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange(index, e, "tags")}
              required
            />
          ))}
          <button
            className="add-field-button"
            type="button"
            onClick={() => addArrayField("tags")}
          >
            Add Tag
          </button>
        </label>

        <label>
          <span>Meal Type:</span>
          <select
            name="mealType"
            value={recipe.mealType}
            onChange={handleChange}
            required
          >
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </label>

        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </label>

        <button className="submit-recipe-btn" type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
};
