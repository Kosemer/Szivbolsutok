import React from 'react';
import classes from './IntroSection.module.css';
import wordCloudMobile from '../../Assets/CakesPicture/wordCloudMobile.png';

const IntroSection = () => {
  return (
    <div className={classes.container}>
      <div className={classes.leftSection}>
        <img src={wordCloudMobile} alt="wordCloud" className={classes.wordCloud} />
      </div>
      <div className={classes.rightSection}>
        <div className={classes.titleBox}>
          <h1 className={classes.centeredTextTitle}>
            <h1 className={classes.pinkText}>
              Üdvözöllek
              <br />
            </h1>
            <h1 className={classes.blackText}>az oldalon!</h1>
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
      </div>
    </div>
  );
};

export default IntroSection; 