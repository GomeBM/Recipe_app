// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import RecipeCard from "./RecipeCard";
// import "./RecipeCarousel.css";

// const CustomRightArrow = ({ onClick, ...rest }) => {
//   const {
//     onMove,
//     carouselState: { currentSlide, deviceType },
//   } = rest;
//   return (
//     <button onClick={() => onClick()} className="custom-arrow right">
//       ❯
//     </button>
//   );
// };

// const CustomLeftArrow = ({ onClick, ...rest }) => {
//   const {
//     onMove,
//     carouselState: { currentSlide, deviceType },
//   } = rest;
//   return (
//     <button onClick={() => onClick()} className="custom-arrow left">
//       ❮
//     </button>
//   );
// };

// const CustomDot = ({ onClick, ...rest }) => {
//   const {
//     onMove,
//     index,
//     active,
//     carouselState: { currentSlide, deviceType },
//   } = rest;
//   const carouselItems = [1, 2, 3, 4, 5];
//   return (
//     <button
//       className={active ? "custom-dot active" : "custom-dot"}
//       onClick={() => onClick()}
//     >
//       {React.Children.toArray(carouselItems)[index]}
//     </button>
//   );
// };

// const RecipeCarousel = ({ recipes }) => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 4,
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
//     <div className="carousel-container">
//       {recipes.length > 0 ? (
//         <Carousel
//           responsive={responsive}
//           infinite={true}
//           centerMode={true}
//           focusOnSelect={false}
//           swipeable={false}
//           draggable={false}
//           showDots={true}
//           customRightArrow={<CustomRightArrow />}
//           customLeftArrow={<CustomLeftArrow />}
//           customDot={<CustomDot />}
//         >
//           {recipes.map((recipe, index) => (
//             <RecipeCard key={index} recipe={recipe} />
//           ))}
//         </Carousel>
//       ) : (
//         <p>No recipes available.</p>
//       )}
//     </div>
//   );
// };

// export default RecipeCarousel;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "./RecipeCard";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import "./RecipeCarousel.css";

const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <button onClick={() => onClick()} className="custom-arrow right">
      <GrLinkNext />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  return (
    <button onClick={() => onClick()} className="custom-arrow left">
      <GrLinkPrevious />
    </button>
  );
};

const CustomDot = ({ onClick, ...rest }) => {
  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  } = rest;
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
      items: 2,
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
          centerMode={true}
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
