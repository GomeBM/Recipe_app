import React, { useEffect, useState } from "react";
import { getUser, logout } from "../../UtilityFunctions";
import { CiSquarePlus, CiCircleMinus } from "react-icons/ci";
import "./HomePage.css";
import RecipeCarousel from "../../components/RecipeCarousel/RecipeCarousel";

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const [connectedUserName, setConnectedUserName] = useState(null);

  const [breakfastVisible, setBreakfastVisible] = useState(false);
  const [lunchVisible, setLunchVisible] = useState(false);
  const [dinneVisible, setDinnerVisible] = useState(false);

  const setIndividualRecipeLists = (allRecipes) => {
    const breakfast = allRecipes.filter((recipe) =>
      recipe.mealType.includes("Breakfast")
    );
    const lunch = allRecipes.filter((recipe) =>
      recipe.mealType.includes("Lunch")
    );
    const dinner = allRecipes.filter((recipe) =>
      recipe.mealType.includes("Dinner")
    );

    setBreakfastRecipes(breakfast);
    setLunchRecipes(lunch);
    setDinnerRecipes(dinner);
  };

  const fetchAllRecipesFromDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/recipes/get-all-recipes"
      );
      const data = await response.json();
      setAllRecipes(data.recipes);
      setIndividualRecipeLists(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipesFromDB();
  }, []);

  useEffect(() => {
    const checkUserStatus = () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const user = getUser();
        if (user && user.name) {
          setConnectedUserName(user.name);
        }
      } else {
        setConnectedUserName(null);
      }
    };

    checkUserStatus();

    // Listen for token changes
    window.addEventListener("tokenChanged", checkUserStatus);

    return () => {
      window.removeEventListener("tokenChanged", checkUserStatus);
    };
  }, []);

  return (
    <div className="home-page-container">
      {connectedUserName && (
        <h1 className="welcome-header">{`Hello ${connectedUserName}`}</h1>
      )}
      <div className="all-recipes-container">
        <h2 className="all-recipes-header">All of our recipes:</h2>
        <RecipeCarousel recipes={allRecipes} />
      </div>
      <div className="reveal-lists-container">
        <div className="reveal-breakfast-container">
          <div
            className="reveal-button-container"
            onClick={() => setBreakfastVisible(!breakfastVisible)}
          >
            {!breakfastVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {breakfastVisible
                ? "HIDE BREAKFAST RECIPES"
                : "SHOW BREAKFAST RECIPES"}
            </p>
          </div>
          <div
            className={`breakfast-container ${
              breakfastVisible ? "visible" : ""
            }`}
          >
            <div className="breakfast-content">
              <h2 className="all-recipes-header">
                Great recipes for BREAKFAST:
              </h2>
              <RecipeCarousel recipes={breakfastRecipes} />
            </div>
          </div>
        </div>

        <div className="reveal-breakfast-container">
          <div
            className="reveal-button-container"
            onClick={() => setLunchVisible(!lunchVisible)}
          >
            {!lunchVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {lunchVisible ? "HIDE LUNCH RECIPES" : "SHOW LUNCH RECIPES"}
            </p>
          </div>
          <div
            className={`breakfast-container ${lunchVisible ? "visible" : ""}`}
          >
            <div className="breakfast-content">
              <h2 className="all-recipes-header">Great recipes for LUNCH:</h2>
              <RecipeCarousel recipes={lunchRecipes} />
            </div>
          </div>
        </div>

        <div className="reveal-breakfast-container">
          <div
            className="reveal-button-container"
            onClick={() => setDinnerVisible(!dinneVisible)}
          >
            {!lunchVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {lunchVisible ? "HIDE DINNER RECIPES" : "SHOW DINNER RECIPES"}
            </p>
          </div>
          <div
            className={`breakfast-container ${dinneVisible ? "visible" : ""}`}
          >
            <div className="breakfast-content">
              <h2 className="all-recipes-header">Great recipes for DINNER:</h2>
              <RecipeCarousel recipes={dinnerRecipes} />
            </div>
          </div>
        </div>
      </div>
      {/* ... (keep other recipe sections) */}
    </div>
  );
};

export default Homepage;
