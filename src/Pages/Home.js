import AccordionPictureBox from "../Components/AccordionPictureBox/AccordionPictureBox";
import OptionalPhotoshoots from "../Components/UI/GoToGallery/OptionalPhotoshoots";
import Slider from "../Components/UI/Slider/Slider";
import classes from "./Home.module.css";
import OpinionSwiperCard from "../Components/UI/OpinionSwiper/OpinionSwiperCard";
import React, { useEffect } from "react";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CardGallery from "../Components/PhotoGallery/CardGallery";
import CategorySection from "../Components/PhotoGallery/CategorySection";
import IntroductorySection from "../Components/ParallaxIntroductorySection/IntroductorySection";
import hagyomanyosTortak from "../Assets/CakesPicture/tgvccx.png"

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

      <div>
        <CategorySection
          category={"Hagyományos Torták"}
          imageSrc={hagyomanyosTortak}
        ></CategorySection>
        <CardGallery categories={"hagyomanyosTortak"}></CardGallery>
        <CategorySection
          category={"Burkolt Torták"}
          imageSrc={hagyomanyosTortak}
        ></CategorySection>
        <CardGallery categories={"burkoltTortak"}></CardGallery>
        <CategorySection
          category={"Linzertorták"}
          imageSrc={hagyomanyosTortak}
        ></CategorySection>
        <CardGallery categories={"linzerTotak"}></CardGallery>
        <CategorySection
          category={"Macaronok"}
          imageSrc={hagyomanyosTortak}
        ></CategorySection>
        <CardGallery categories={"macaronok"}></CardGallery>
        <CardGallery categories={"hagyomanyosSutemenyek"}></CardGallery>
        <CardGallery categories={"mentesSutemenyek"}></CardGallery>
        <CardGallery categories={"fondantFigurak"}></CardGallery>
      </div>
      <div className={classes.DesktopSlider}>
        <DesktopSlider></DesktopSlider>
      </div>
      <div className={classes.mobileCardSlider}>
        <OpinionSwiperCard></OpinionSwiperCard>
      </div>
      <div className={classes.container}>
        <h2 className={classes.title}>Irány a galéria</h2>
        <hr className={classes.underline} />
        <OptionalPhotoshoots></OptionalPhotoshoots>
      </div>
    </div>
  );
}

export default Home;
