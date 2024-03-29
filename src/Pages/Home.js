import AccordionPictureBox from "../Components/AccordionPictureBox/AccordionPictureBox";
import OptionalPhotoshoots from "../Components/UI/GoToGallery/OptionalPhotoshoots";
import Slider from "../Components/UI/Slider/Slider";
import classes from "./Home.module.css";
import OpinionSwiperCard from "../Components/UI/OpinionSwiper/OpinionSwiperCard";
import React, { useEffect } from "react";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CardGallery from "../Components/PhotoGallery/CardGallery";
import NewNavbar from "../Components/Layout/NewNavbar";
import IntroductorySection from '../Components/ParallaxIntroductorySection/IntroductorySection'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Slider></Slider>
      <div className={classes.quote}>
        <blockquote>
          „Az igazán jó képeknek két alapvető motívuma van: az őszinteség és a
          természetesség.”<br></br>{" "}
          <span className={classes.author}>– Reismann Marian</span>
        </blockquote>
      </div>
      
      <div className={classes.divider}>
        <div className={classes.line1}></div>
        <h2 className={classes.title}>Néhány kép a munkáimból</h2>
        <div className={classes.line2}></div>
      </div>
      <IntroductorySection></IntroductorySection>
      <div className={classes.pictureBox}>
        <div>
          <AccordionPictureBox></AccordionPictureBox>
        </div>
      </div>
      <div className={classes.DesktopSlider}>
        <DesktopSlider></DesktopSlider>
      </div>
      <div className={classes.mobileCardSlider}>
        <OpinionSwiperCard></OpinionSwiperCard>
      </div>

      <CardGallery></CardGallery>

      <div className={classes.container}>
        <h2 className={classes.title}>Irány a galéria</h2>
        <hr className={classes.underline} />
        <OptionalPhotoshoots></OptionalPhotoshoots>
      </div>
    </div>
  );
}

export default Home;
