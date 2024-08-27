import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "./RecipeCard";
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

const CustomDot = ({ onClick, index, active }) => {
  const carouselItems = [1, 2, 3, 4, 5];
  return (
    <button
      className={active ? "custom-dot active" : "custom-dot"}
      onClick={() => onClick()}
    >
      {React.Children.toArray(carouselItems)[index]}
    </button>
  );
};

const RecipeCarousel = ({ recipes }) => {
  const isMobile = useMediaQuery({ maxWidth: 464 });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
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
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </Carousel>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipeCarousel;
