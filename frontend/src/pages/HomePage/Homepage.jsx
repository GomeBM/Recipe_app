import React, { useEffect, useState } from "react";
import { getUser, logout } from "../../UtilityFunctions";
import { CiSquarePlus, CiCircleMinus } from "react-icons/ci";
import Popup from "../../components/Popup/Popup";
import "./HomePage.css";
import RecipeCarousel from "../../components/RecipeCarousel/RecipeCarousel";
import FilterSection from "../../components/FilterSection/FilterSection";

const Homepage = () => {
  const [unfilteredRecipes, setUnfilteredRecipes] = useState([]); // New state to store unfiltered recipes
  const [allRecipes, setAllRecipes] = useState([]);
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const [connectedUserName, setConnectedUserName] = useState(null);
  const [refresh, setRefresh] = useState(false); // New state for refresh
  const [favorites, setFavorites] = useState([]); // New state for favorites

  const [breakfastVisible, setBreakfastVisible] = useState(false);
  const [lunchVisible, setLunchVisible] = useState(false);
  const [dinnerVisible, setDinnerVisible] = useState(false);

  const [showPopup, setShowPopup] = useState({
    show: false,
    message: "",
    recipeImage: null,
  });

  const setIndividualRecipeLists = (recipes) => {
    const breakfast = recipes.filter((recipe) =>
      recipe.mealType.includes("Breakfast")
    );
    const lunch = recipes.filter((recipe) => recipe.mealType.includes("Lunch"));
    const dinner = recipes.filter((recipe) =>
      recipe.mealType.includes("Dinner")
    );

    setBreakfastRecipes(breakfast);
    setLunchRecipes(lunch);
    setDinnerRecipes(dinner);
  };

  // Modified fetch function
  const fetchAllRecipesFromDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/recipes/get-all-recipes"
      );
      const data = await response.json();
      setUnfilteredRecipes(data.recipes);
      setAllRecipes(data.recipes);
      setIndividualRecipeLists(data.recipes);

      // Fetch user favorites if the user is connected
      const user = getUser();
      if (user && user.id) {
        const favoritesResponse = await fetch(
          "http://localhost:4000/user/my-fav-recipes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: user.id }),
          }
        );
        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData.fav_recipes); // Store favorites in state
      }
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

    window.addEventListener("tokenChanged", checkUserStatus);

    return () => {
      window.removeEventListener("tokenChanged", checkUserStatus);
    };
  }, []);

  const handlePopUp = (recipe, isAlreadyInFavs) => {
    setShowPopup({
      show: true,
      message: isAlreadyInFavs
        ? `${recipe.name} has been removed from your favorite list`
        : `${recipe.name} has been added to your favorite list`,
      recipeImage: recipe.image,
    });
  };

  return (
    <div className="home-page-container">
      {connectedUserName && (
        <h1 className="welcome-header">{`Hello ${connectedUserName}`}</h1>
      )}
      {showPopup.show && (
        <Popup
          message={showPopup.message}
          recipeImage={showPopup.recipeImage}
          onClose={() =>
            setShowPopup({ show: false, message: "", recipeImage: "" })
          }
        />
      )}

      <FilterSection
        allRecipes={allRecipes}
        setAllRecipes={setAllRecipes}
        setIndividualRecipeLists={setIndividualRecipeLists}
        setRefresh={setRefresh} // Pass setRefresh to FilterSection
        unfilteredRecipes={unfilteredRecipes} // Pass unfilteredRecipes to FilterSection
      />

      <div className="all-recipes-container">
        <h2 className="all-recipes-header">All of our recipes:</h2>
        <RecipeCarousel
          key={`${allRecipes.length}-${refresh}`}
          recipes={allRecipes}
          popUp={handlePopUp}
          removeAble={false}
          favorites={favorites} // Pass favorites to RecipeCarousel
        />
      </div>

      <div className="reveal-lists-container">
        {/* Breakfast Recipes */}
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
              <RecipeCarousel
                key={`${breakfastRecipes.length}-${refresh}`}
                recipes={breakfastRecipes}
                popUp={handlePopUp}
                removeAble={false}
                favorites={favorites} // Pass favorites to RecipeCarousel
              />
            </div>
          </div>
        </div>

        {/* Lunch Recipes */}
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
              <RecipeCarousel
                key={`${lunchRecipes.length}-${refresh}`}
                recipes={lunchRecipes}
                popUp={handlePopUp}
                removeAble={false}
                favorites={favorites} // Pass favorites to RecipeCarousel
              />
            </div>
          </div>
        </div>

        {/* Dinner Recipes */}
        <div className="reveal-breakfast-container">
          <div
            className="reveal-button-container"
            onClick={() => setDinnerVisible(!dinnerVisible)}
          >
            {!dinnerVisible ? (
              <CiSquarePlus className="reveal-button" />
            ) : (
              <CiCircleMinus className="reveal-button" />
            )}
            <p className="reveal-button-text">
              {dinnerVisible ? "HIDE DINNER RECIPES" : "SHOW DINNER RECIPES"}
            </p>
          </div>
          <div
            className={`breakfast-container ${dinnerVisible ? "visible" : ""}`}
          >
            <div className="breakfast-content">
              <h2 className="all-recipes-header">Great recipes for DINNER:</h2>
              <RecipeCarousel
                key={`${dinnerRecipes.length}-${refresh}`}
                recipes={dinnerRecipes}
                popUp={handlePopUp}
                removeAble={false}
                favorites={favorites} // Pass favorites to RecipeCarousel
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
