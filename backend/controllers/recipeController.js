const express = require("express");
const recipeModel = require("../models/recipeModel");
require("dotenv").config();

const router = express.Router();

//GET ALL RECIPES FROM DUMMYJSON API FOR STARTERS IN ORDER TO POPULATE THE DB
router.get("/get-from-api-to-db", async (req, res) => {
  try {
    // Fetch recipes from the API
    const response = await fetch("https://dummyjson.com/recipes?limit=0");
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }

    const data = await response.json();
    console.log("Data from dummyjson:", data);

    // Map the API response to your Recipe model schema
    const recipesToSave = data.recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      difficulty: recipe.difficulty,
      nationality: recipe.cuisine, // Mapping cuisine to nationality
      tags: recipe.tags,
      userId: recipe.userId,
      image: recipe.image,
      rating: recipe.rating,
      reviewCount: recipe.reviewCount,
      mealType: recipe.mealType,
    }));

    // Save or update each recipe in the database
    const savedRecipes = [];
    for (const recipe of recipesToSave) {
      const savedRecipe = await recipeModel.findOneAndUpdate(
        { id: recipe.id }, // Search by the unique id from the API
        recipe, // Update with the mapped data
        { upsert: true, new: true } // Create if it doesn't exist, return the new document
      );
      savedRecipes.push(savedRecipe); // Collect the saved/updated recipes
    }

    // Return the saved/updated recipes in the response
    res.status(201).json({
      message: "Recipes successfully saved/updated!",
      recipes: savedRecipes,
    });
  } catch (error) {
    console.log("Fetch error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

//GET ALL RECIPES FROM THE DB
router.get("/get-all-recipes", async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    const totalRecipes = await recipeModel.countDocuments();
    res.json({ recipes, totalRecipes });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//GET ALL RECIPES FROM THE DB BASED ON INGREDIENTS LIST
router.get("/get-by-ingredients", async (req, res) => {
  const { ingredients } = req.body;

  try {
    // Convert ingredients to lowercase and create regex patterns with word boundaries
    const regexPatterns = ingredients.map(
      (ingredient) => new RegExp(`\\b${ingredient.toLowerCase()}\\b`, "i")
    );

    // Query the database
    const recipes = await recipeModel.find({
      ingredients: {
        $elemMatch: {
          $in: regexPatterns,
        },
      },
    });

    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
