import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiSquarePlus, CiCircleMinus } from "react-icons/ci";
import Popup from "../../components/Popup/Popup";
import { getUser } from "../../UtilityFunctions";
import "./FullRecipeInformation.css";

const FullRecipeInformation = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const [showPopup, setShowPopup] = useState({
    show: false,
    message: "",
    recipeImage: null,
  });

  const handleAddToFavs = async () => {
    try {
      const user = getUser();
      const response = await fetch("http://localhost:4000/user/add-to-favs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, recipeId: recipe._id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setShowPopup({
        show: true,
        message: `${recipe.name} has been added to your favourite list`,
        recipeImage: recipe.image,
      });
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setShowPopup({
        show: true,
        message: `Please connect to your account in order to add ${recipe.name} to your favourite list `,
        recipeImage: recipe.image,
      });
    }
  };

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
        <img
          src={recipe.image}
          alt={recipe.name}
          className="full-recipe-image"
        />
        <div className="bellow-image-container">
          <h2 className="full-recipe-name">{recipe.name}</h2>
          <div className="recipe-details">
            <div className="full-recipe-details-section">
              <strong className="full-recipe-details-section-header">
                {" "}
                Cuisine
              </strong>
              <p>{recipe.nationality}</p>
            </div>
            <div className="full-recipe-details-section">
              <strong className="full-recipe-details-section-header">
                Difficulty
              </strong>
              <p>{recipe.difficulty}</p>
            </div>
            <div className="full-recipe-details-section">
              <strong className="full-recipe-details-section-header">
                Meal Type
              </strong>
              <p>{recipe.mealType.join(", ")}</p>
            </div>
            <div className="full-recipe-details-section">
              <strong className="full-recipe-details-section-header">
                Cooking time
              </strong>
              <p>{`${
                recipe.cookTimeMinutes + recipe.prepTimeMinutes
              } minutes`}</p>
            </div>
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
              <h2 className="full-recipe-header"></h2>
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
                {instructionsVisible
                  ? "HIDE INSTRUCTIONS"
                  : "SHOW INSTRUCTIONS"}
              </p>
            </div>
            <div
              className={`recipe-instructions ${
                instructionsVisible ? "visible" : ""
              }`}
            >
              <h2 className="full-recipe-header"></h2>
              <ol className="full-recipe-instructions-list">
                {recipe.instructions.map((step, index) => (
                  <li className="full-recipe-instruction" key={index}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <button className="add-to-favs-btn" onClick={handleAddToFavs}>
            ADD TO FAVS
          </button>
          {showPopup.show && (
            <Popup
              message={showPopup.message}
              recipeImage={showPopup.recipeImage}
              onClose={() =>
                setShowPopup({ show: false, message: "", recipeImage: "" })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FullRecipeInformation;
