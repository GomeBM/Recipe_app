const express = require("express");
const recipeModel = require("../models/recipeModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = express.Router();

//ADDS RECIPE TO THE USER MY_RECIPES AND TO THE RECIPES DATA BASE
router.post("/add-recipe", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findOne({ _id: userId });

    // Ensure the user is found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const uploadedBy = user._id;
    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      nationality,
      tags,
      image,
      mealType,
    } = req.body;

    console.log("Received recipe data:", {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      nationality,
      tags,
      image,
      mealType,
    });

    // Create a new recipe document
    const newRecipe = new recipeModel({
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      nationality,
      tags,
      uploadedBy,
      image,
      mealType,
    });

    // Save the new recipe
    await newRecipe.save();

    // Add the new recipe to the user's my_recipes array
    user.my_recipes.push({ recipe: newRecipe._id });

    // Save the updated user document
    await user.save();

    res.status(201).json({
      message: "Recipe added to DB and user's my_recipes successfully!",
      added_recipe: newRecipe,
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: error.message });
  }
});

//ADDS RECIPE TO THE USER FAV_RECIPES LIST
router.post("/add-to-favs", async (req, res) => {
  const { userId, recipeId } = req.body;
  console.log("Received add to wishlist request:", req.body);
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      console.log("Recipe not found:", recipeId);
      return res.status(404).json({ message: "Recipe not found" });
    }

    const favListItemIndex = user.fav_recipes.findIndex(
      (item) => item.recipe.toString() === recipeId
    );

    let isAlreadyInFavs = false;

    if (favListItemIndex === -1) {
      // Add to favlist if not already there
      user.fav_recipes.push({ recipe: recipeId });
      console.log(`Added recipe ${recipeId} to wishlist for user ${userId}`);
    } else {
      // console.log(`${recipe.name} already in fav list for user : ${userId}`);
      // isAlreadyInFavs = true;
      user.fav_recipes.splice(favListItemIndex, 1);
      console.log(
        `Removed recipe ${recipeId} from fav list for user ${userId}`
      );
      isAlreadyInFavs = true;
    }

    await user.save();
    res.status(200).json({
      message: isAlreadyInFavs
        ? "Recipe already in favorites"
        : "Favorites updated",
      fav_recipes: user.fav_recipes,
      isAlreadyInFavs: isAlreadyInFavs,
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: error.message });
  }
});

//GET CURRENT USERS MY_RECIPES ARRAY
router.post("/my-recipes", async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await userModel.findOne({ _id }).populate("my_recipes.recipe");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Here are your recipes",
      my_recipes_ammount: user.my_recipes.length,
      my_recipes: user.my_recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: error.message });
  }
});

//GET CURRENT USERS FAV_RECIPES ARRAY
router.post("/my-fav-recipes", async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await userModel
      .findOne({ _id })
      .populate("fav_recipes.recipe");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Here are your recipes",
      fav_recipes_ammount: user.fav_recipes.length,
      fav_recipes: user.fav_recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
