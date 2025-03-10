import React, { useEffect, useState } from "react";
import classes from "./ParalaxSection.module.css";
import image1 from "../../Assets/CakesPicture/HarryPotter.png";
import image2 from "../../Assets/CakesPicture/Macaron.png";
import image3 from "../../Assets/CakesPicture/Málna, mogyoró mousse.jpg";
import fruitCake from "../../Assets/CakesPicture/viragLada.png";
import wordCloud from "../../Assets/CakesPicture/wordCloud.png";
import wordCloudMobile from "../../Assets/CakesPicture/wordCloudMobile.png";
import AnimatedDownArrow from "../AnimatedDownArrow/AnimatedDownArrow";
import IntroSection from "../IntroSection/IntroSection";

function ParalaxSection() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={classes.parallax}>
        <div className={classes.titleBox}>
          <h1 className={classes.centeredTextTitle}>
            <span className={classes.pinkText}>
              Üdvözöllek
              <br />
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
            láthatod az oldalon.
            <br />
            <br />
            Jó nézelődést kívánok! 🙂
          </p>
        </div>
        {isMobileView ? (
          <div className={classes.fruitCakeContainer}>
            <img
              src={fruitCake}
              alt="Fruit Cake"
              className={classes.fruitCake}
            />
          </div>
        ) : (
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
        )}
      </div>
      <div className={classes.titleContainer}>
        <h1 className={classes.productCategoryTitle}>Fedezd fel a</h1>
        <h1 className={classes.productCategoryTitle2}>termékkategóriákat!</h1>
      </div>

<IntroSection></IntroSection>
      <div className={classes.container}>
        <img
          src={wordCloudMobile}
          alt="wordCloud"
          className={classes.wordCloudMobile}
        />
      </div>

    </div>
  );
}

export default ParalaxSection;
