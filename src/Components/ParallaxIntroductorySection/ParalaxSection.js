import React from "react";
import classes from "./ParalaxSection.module.css";
import image1 from "../../Assets/CakesPicture/HarryPotter.png";
import image2 from "../../Assets/CakesPicture/Macaron.png";
import image3 from "../../Assets/CakesPicture/Málna, mogyoró mousse.jpg";

function ParalaxSection() {
  return (
    <div>
      <div className={classes.parallax}>
        <div className={classes.titleBox}>
          <h1 className={classes.centeredTextTitle}>
            <span className={classes.pinkText}>
              Üdvözöllek<br />
            </span>
            <span className={classes.blackText}>az oldalon!</span>
          </h1>
        </div>
        <div className={classes.rectangle}>
          <p className={classes.introductoryText2}>
            Mióta az eszemet tudom, a sütés-főzés teszi ki a gondolataim
            jelentős részét. A sütéssel komolyabban is elkezdtem foglalkozni,
            ezért 2017-ben elvégeztem egy cukrász képzést. Ezt követően pedig
            megállíthatatlan süteménykészítésbe kezdtem a hagyományos és a
            mentes vonalon is bontogatva a szárnyaimat. Mindezek eredményét
            láthatod az oldalon.<br /><br />
            Jó nézelődést kívánok! 🙂
          </p>
        </div>
        <div className={classes.imageContainer}>
          <div className={classes.imageBoxSingle}>
            <img src={image1} alt="Image 1" />
          </div>
          <div className={classes.imageBoxGroup}>
            <div className={classes.imageBox}>
              <img src={image2} alt="Image 2" />
            </div>
            <div className={classes.imageBox2}>
              <img src={image3} alt="Image 3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParalaxSection;
