import classes from "./IntroductorySection.module.css";

function IntroductorySection() {
  return (
    <div>
      <div className={classes.parallax}>
        <h1 className={classes.centeredTextTitle}>Üdvözöllek az oldalon!</h1>
      </div>
      <div className={classes.text}>
        <p className={classes.introductoryText}>
          Mióta az eszemet tudom, a sütés-főzés teszi ki a gondolataim jelentős
          részét. A sütéssel komolyabban is elkezdtem foglalkozni, ezért
          2017-ben elvégeztem egy cukrász képzést. Ezt követően pedig
          megállíthatatlan süteménykészítésbe kezdtem a hagyományos és a mentes
          vonalon is bontogatva a szárnyaimat. Mindezek eredményét láthatod az
          oldalon.
        </p>
      </div>
      <div className={classes.parallax}>
        <h1 className={classes.centeredText}> Jó nézelődést kívánok! 🙂</h1>
      </div>
    </div>
  );
}

export default IntroductorySection;
