import React from "react";
import classes from "./ParalaxSection.module.css";
import fruitCake from "../../Assets/CakesPicture/viragLada.png";
import polygonSvg from "../../Assets/CakesPicture/polygonSvg.svg";

function ParalaxSection() {
  return (
    <div>
      <div className={classes.parallax}>
        <div className={classes.titleBox}>
          <h1 className={classes.centeredTextTitle}>
            <span className={classes.pinkText}>
              Üdvözöllek<br></br>
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
            láthatod az oldalon.<br></br><br></br>
            Jó nézelődést kívánok! 🙂
          </p>
         
        </div>
        <img src={fruitCake} alt="Fruit Cake" className={classes.fruitCake} />
      </div>
    </div>
  );
}

export default ParalaxSection;
