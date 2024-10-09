import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";
import "./RecipeCarousel.css";

const CustomRightArrow = ({ onClick }) => {
  return (
    <button onClick={() => onClick()} className="custom-arrow right">
      <GrLinkNext />
    </button>
  );
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button onClick={() => onClick()} className="custom-arrow left">
      <GrLinkPrevious />
    </button>
  );
};

const RecipeCarousel = ({ recipes, popUp, favorites }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="carousel-container">
      {recipes.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          centerMode={!isMobile}
          focusOnSelect={false}
          swipeable={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              popUp={popUp}
              removeAble={false}
              favorites={favorites} // Pass favorites to RecipeCarousel
            />
          ))}
        </Carousel>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipeCarousel;
