// import React, { useEffect, useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./HomePage.css";
// import RecipeCard from "../../components/RecipeCard";

// const Homepage = () => {
//   const [allRecipes, setAllRecipes] = useState([]);

//   const fetchAllRecipesFromDB = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:4000/recipes/get-all-recipes"
//       );
//       const data = await response.json();
//       setAllRecipes(data.recipes);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllRecipesFromDB();
//   }, []);

//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 6,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <div className="home-page-container">
//       <h2 className="all-recipes-header">
//         Here you can find all of our recipes:
//       </h2>
//       <div className="carousel-container">
//         {allRecipes.length > 0 ? (
//           <Carousel responsive={responsive} infinite={true}>
//             {allRecipes.map((recipe, index) => (
//               <RecipeCard key={index} recipe={recipe} />
//             ))}
//           </Carousel>
//         ) : (
//           <p>No recipes available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from "react";
import "./HomePage.css";
import RecipeCarousel from "../../components/RecipeCarousel";

const Homepage = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const fetchAllRecipesFromDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/recipes/get-all-recipes"
      );
      const data = await response.json();
      setAllRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipesFromDB();
  }, []);

  return (
    <div className="home-page-container">
      <div className="all-recipes-container">
        <h2 className="all-recipes-header">
          Here you can find all of our recipes:
        </h2>
        <RecipeCarousel recipes={allRecipes} />
      </div>
    </div>
  );
};

export default Homepage;
