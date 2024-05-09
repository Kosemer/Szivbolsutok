import OptionalPhotoshoots from "../Components/UI/GoToGallery/OptionalPhotoshoots";
import Slider from "../Components/UI/Slider/Slider";
import classes from "./Home.module.css";
import OpinionSwiperCard from "../Components/UI/OpinionSwiper/OpinionSwiperCard";
import React, { useEffect } from "react";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CardGallery from "../Components/PhotoGallery/CardGallery";
import CategorySection from "../Components/PhotoGallery/CategorySection";
import IntroductorySection from "../Components/ParallaxIntroductorySection/IntroductorySection";
import hagyomanyosTortak from "../Assets/CategorySection/kitKat2.png";
import burkoltTortak from "../Assets/CategorySection/viragLada.png";
import linzerTortak from "../Assets/CategorySection/almas3.png";
import macaronok from "../Assets/CategorySection/foMacaron2.png";
import fondantFigurak from "../Assets/CategorySection/Skye-mancs orjarat.png";
import mentesSutemenyek from "../Assets/CategorySection/mindenmentes_csokis_epres_torta2.png";
import ParalaxSection from "../Components/ParallaxIntroductorySection/ParalaxSection";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/*<Slider></Slider>*/}
      <ParalaxSection></ParalaxSection>

      <div>
        <div className={classes.section}>
        <CategorySection
          category={"Hagyományos Torták"}
          imageSrc={hagyomanyosTortak}
          description={
            "A hagyományos torták számos kultúrában és országban jelentős szerepet töltenek be ünnepi és különleges alkalmakon. Ezek a desszertek gyakran több generáció receptjei alapján készülnek"
          }
        ></CategorySection>
        <CardGallery categories={"HagyomanyosTortak"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Burkolt Torták"}
          imageSrc={burkoltTortak}
          description={
            "A burkolt torták különleges és művészi alkotások, amelyeket általában különleges alkalmakra vagy ünnepekre készítenek. A burkolt torták gyakran lenyűgöző megjelenésük miatt népszerűek esküvőkön, születésnapokon és más ünnepi eseményeken."
          }
        ></CategorySection>
        <CardGallery categories={"BurkoltTortak"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Linzertorták"}
          imageSrc={linzerTortak}
          description={
            "A linzertorta egy hagyományos osztrák sütemény, amelyet általában ünnepekre és különleges alkalmakra készítenek. Ez az ízletes torta rétegekben vagy tésztaként készül, és gyakran málna- vagy ribizlis lekvárral van töltve."
          }
        ></CategorySection>
        <CardGallery categories={"Linzertortak"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Macaronok"}
          imageSrc={macaronok}
          description={
            "A macaronok finom francia édességek, melyek két mandulás piskóta közé töltött krém vagy lekvár réteggel készülnek. Ezek a kis, színes sütemények számos ízben és színben elérhetőek, így sokféle kombinációban kóstolhatóak."
          }
        ></CategorySection>
        <CardGallery categories={"Macaronok"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Hagyományos Sütemények"}
          imageSrc={macaronok}
          description={
            "A hagyományos sütemények hordozzák magukban az évtizedek vagy akár évszázadok alatt kialakult ízek és receptek varázsát. Ezek a finomságok gyakran nemcsak ízükkel, hanem történetükkel is gazdagítják az étkezéseket."
          }
        ></CategorySection>
        <CardGallery categories={"HagyomanyosSutemenyek"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Mentes Sütemények"}
          imageSrc={mentesSutemenyek}
          description={
            "A mentes sütemények olyan különleges édességek, melyek kiváló alternatívát nyújtanak azoknak, akik különböző ételintoleranciával vagy diétás korlátozásokkal küzdenek, például glutén-, tej-, vagy tojásmentes ételeket keresnek. Ezek a sütemények általában kreatív és egészséges összetevőket használnak."
          }
        ></CategorySection>
        <CardGallery categories={"MentesSutemenyek"}></CardGallery>
        </div>
        <div className={classes.section}>
        <CategorySection
          category={"Fondant figurák"}
          imageSrc={fondantFigurak}
          description={
            "A fondant figurák kézműves mestermunkák, melyekkel valódi művészi alkotásokat lehet létrehozni a süteményeken és tortákon. A fondant, egy rugalmas, gyurma-szerű cukormáz, lehetővé teszi a különféle formák és modellek készítését, legyen az virág, állat, vagy akár személyes karakter."
          }
        ></CategorySection>
        <CardGallery categories={"FondantFigurak"}></CardGallery>
        </div>
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
