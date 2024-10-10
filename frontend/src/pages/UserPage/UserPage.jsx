import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../UtilityFunctions";
import { CiCirclePlus } from "react-icons/ci";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Popup from "../../components/Popup/Popup";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState({
    show: false,
    message: "",
    recipeImage: null,
  });
  const { id } = useParams();

  const fetchUserFavRecipes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/my-fav-recipes`,
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
      setFavoriteRecipes(data.fav_recipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  useEffect(() => {
    const fetchUsersRecipes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/my-recipes`,
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
        setMyRecipes(data.my_recipes);
        const user = getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUsersRecipes();
    fetchUserFavRecipes();
  }, [id]);

  const handlePopUp = (recipe, isRemoved) => {
    setShowPopup({
      show: true,
      message: `${recipe.name} has been removed from your favorites list`,
      recipeImage: recipe.image,
    });
    fetchUserFavRecipes(); // Refresh the favorites list
  };

  if (!user) {
    return <div className="user-page-container">Loading...</div>;
  }

  return (
    <div className="user-page-container">
      <h1 className="user-page-header">{user.name}'s Page</h1>
      <div className="add-recipe-button-container">
        <p className="reveal-button-text">ADD A NEW RECIPE</p>
        <Link to={"/addRecipe"}>
          <CiCirclePlus className="reveal-button" />
        </Link>
      </div>
      <div className="my-recipes-container">
        <h2 className="user-page-header">{user.name}'s Recipes:</h2>
        {myRecipes.length > 0 ? (
          <div className="my-recipes-row">
            {myRecipes.map((myRecipe) => (
              <RecipeCard
                key={myRecipe.recipe._id}
                recipe={myRecipe.recipe}
                popUp={handlePopUp}
                myOwn={true}
              />
            ))}
          </div>
        ) : (
          <p>You Have 0 favourite recipes</p>
        )}
      </div>
      <div className="fav-recipes-container">
        <h2 className="user-page-header">{user.name}'s Fav Recipes:</h2>
        {favoriteRecipes.length > 0 ? (
          <div className="fav-recipes-row">
            {favoriteRecipes.map((favRecipe) => (
              <RecipeCard
                key={favRecipe.recipe._id}
                recipe={favRecipe.recipe}
                popUp={handlePopUp}
                removeAble={true}
                favorites={favoriteRecipes}
              />
            ))}
          </div>
        ) : (
          <p>You Have 0 favourite recipes</p>
        )}
      </div>
      {showPopup.show && (
        <Popup
          message={showPopup.message}
          recipeImage={showPopup.recipeImage}
          onClose={() =>
            setShowPopup({ show: false, message: "", recipeImage: null })
          }
        />
      )}
    </div>
  );
};

export default UserPage;
