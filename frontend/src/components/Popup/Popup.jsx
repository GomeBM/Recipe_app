import React from "react";
import "./Popup.css";

const Popup = ({ message, recipeImage, onClose, additionalButtons }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        {recipeImage && (
          <img src={recipeImage} alt="Product" className="popup-image" />
        )}
        <p>{message}</p>
        <div className="popup-buttons">
          {additionalButtons ? (
            additionalButtons
          ) : (
            <button className="ok-button" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
