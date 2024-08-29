// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./FullRecipeInformation.css";

// const FullRecipeInformation = () => {
//   const [recipe, setRecipe] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/recipes/get-by-id",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ _id: id }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setRecipe(data.recipe);
//       } catch (error) {
//         console.error("Error fetching recipe:", error);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (!recipe) {
//     return <div style={{ color: "white", margin: "300px" }}>Loading...</div>;
//   }

//   return (
//     <div className="full-recipe-page">
//       <div className="full-recipe-container">
//         <h1 className="full-recipe-name">{recipe.name}</h1>
//         <img
//           src={recipe.image}
//           alt={recipe.name}
//           className="full-recipe-image"
//         />
//         <div className="recipe-details">
//           <p className="full-recipe-nationality">
//             <strong>Nationality:</strong> {recipe.nationality}
//           </p>
//           <p className="full-recipe-difficulty">
//             <strong>Difficulty:</strong> {recipe.difficulty}
//           </p>
//           <p className="full-recipe-meal-type">
//             <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
//           </p>
//         </div>
//         <div className="recipe-ingredients">
//           <h2 className="full-recipe-header">Ingredients:</h2>
//           <ul className="full-recipe-ingredient-list">
//             {recipe.ingredients.map((ingredient, index) => (
//               <li className="full-recipe-ingredient" key={index}>
//                 {ingredient}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="recipe-instructions">
//           <h2 className="full-recipe-header">Instructions:</h2>
//           <ol className="full-recipe-instructions-list">
//             {recipe.instructions.map((step, index) => (
//               <li className="full-recipe-instruction" key={index}>
//                 {step}
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullRecipeInformation;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiSquarePlus, CiCircleMinus } from "react-icons/ci";
import "./FullRecipeInformation.css";

const FullRecipeInformation = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
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

  if (!recipe) {
    return <div style={{ color: "white", margin: "300px" }}>Loading...</div>;
  }

  return (
    <div className="full-recipe-page">
      <div className="full-recipe-container">
        <h2 className="full-recipe-name">{recipe.name}</h2>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="full-recipe-image"
        />
        <div className="recipe-details">
          <p className="full-recipe-nationality">
            <strong>Cuisine:</strong> {recipe.nationality}
          </p>
          <p className="full-recipe-difficulty">
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p className="full-recipe-meal-type">
            <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
          </p>
        </div>

        <div className="reveal-container">
          <div
            className="reveal-button-container"
            onClick={() => setIngredientsVisible(!ingredientsVisible)}
          >
            {!ingredientsVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {ingredientsVisible ? "HIDE INGREDIENTS" : "SHOW INGREDIENTS"}
            </p>
          </div>
          <div
            className={`recipe-ingredients ${
              ingredientsVisible ? "visible" : ""
            }`}
          >
            <h2 className="full-recipe-header">Ingredients:</h2>
            <ul className="full-recipe-ingredient-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li className="full-recipe-ingredient" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal-container">
          <div
            className="reveal-button-container"
            onClick={() => setInstructionsVisible(!instructionsVisible)}
          >
            {!instructionsVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {instructionsVisible ? "HIDE INSTRUCTIONS" : "SHOW INSTRUCTIONS"}
            </p>
          </div>
          <div
            className={`recipe-instructions ${
              instructionsVisible ? "visible" : ""
            }`}
          >
            <h2 className="full-recipe-header">Instructions:</h2>
            <ol className="full-recipe-instructions-list">
              {recipe.instructions.map((step, index) => (
                <li className="full-recipe-instruction" key={index}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullRecipeInformation;
