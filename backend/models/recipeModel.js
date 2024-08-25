const mongoose = require("mongoose");

// Define the Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], // Array of strings
      required: true,
    },
    instructions: {
      type: [String], // Array of strings
      required: true,
    },
    prepTimeMinutes: {
      type: Number,
      required: true,
    },
    cookTimeMinutes: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"], // Assuming these are the possible values
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Array of strings
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users model
      required: false,
    },
    userId: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    reviewCount: {
      type: Number,
      required: false,
    },
    mealType: {
      type: [String], // Array of strings
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipes", recipeSchema);
