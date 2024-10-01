import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../UtilityFunctions";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUsersRecipes = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/my-recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });

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

    const fetchUserFavRecipes = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/my-fav-recipes",
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

    fetchUsersRecipes();
    fetchUserFavRecipes();
  }, [id]); // <-- Only run the effect when the `id` param changes

  const handlePopUp = (recipe, isAlreadyInFavs) => {
    // Your popup logic goes here
  };

  if (!user) {
    return <div className="user-page-container">Loading...</div>;
  }

  return (
    <div className="user-page-container">
      <h1>{user.name}'s Page</h1>
      <div className="my-recipes-container">
        <h2>My Recipes:</h2>
        {myRecipes.length > 0 ? (
          <p>{`You have ${myRecipes.length} recipes`}</p>
        ) : (
          <p>You Have 0 recipes</p>
        )}
      </div>
      <div className="fav-recipes-container">
        <h2>My Fav Recipes:</h2>
        {favoriteRecipes.length > 0 ? (
          <div className="fav-recipes-row">
            {favoriteRecipes.map((favRecipe) => (
              <RecipeCard
                key={favRecipe.recipe._id}
                recipe={favRecipe.recipe}
                popUp={handlePopUp}
              />
            ))}
          </div>
        ) : (
          <p>You Have 0 favourite recipes</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
