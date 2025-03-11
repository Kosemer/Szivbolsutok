import React from "react";
import classes from "./MainTitle.module.css";
import mainTitle from "../../Assets/Header/mainTitle.png";

const MainTitle = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Ez biztosítja a sima görgetési animációt
    });
  };

  return (
    <div className={classes.mainTitleContainer}>
      <img
        src={mainTitle}
        alt="Szívből Sütök"
        className={classes.mainTitle}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }} // Ez jelzi a felhasználónak, hogy kattintható
      />
    </div>
  );
};

export default MainTitle; 