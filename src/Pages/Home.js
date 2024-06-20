import React, { useEffect, useContext, useRef } from "react";
import classes from "./Home.module.css";
import CartContext from "../Components/Store/cart-context";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CardGalleryTest from "../Components/PhotoGallery/CardGalleryTest";
import CategorySection from "../Components/PhotoGallery/CategorySection";
import hagyomanyosTortak from "../Assets/CategorySection/kitKat2.png";
import burkoltTortak from "../Assets/CategorySection/viragLada.png";
import linzerTortak from "../Assets/CategorySection/almas3.png";
import macaronok from "../Assets/CategorySection/foMacaron2.png";
import fondantFigurak from "../Assets/CategorySection/Skye-mancs orjarat.png";
import mentesSutemenyek from "../Assets/CategorySection/mindenmentes_csokis_epres_torta2.png";
import ParalaxSection from "../Components/ParallaxIntroductorySection/ParalaxSection";
import CurtainGallery from "../Components/PhotoGallery/CurtainGallery";

function Home() {
  const cartCtx = useContext(CartContext);
  
  const sectionsRefs = {
    HagyomanyosTortak: useRef(null),
    BurkoltTortak: useRef(null),
    Linzertortak: useRef(null),
    Macaronok: useRef(null),
    HagyomanyosSutemenyek: useRef(null),
    MentesSutemenyek: useRef(null),
    FondantFigurak: useRef(null),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cartCtx.scrollToCategory) {
      sectionsRefs[cartCtx.scrollToCategory].current.scrollIntoView({ behavior: "smooth" });
      cartCtx.setScrollToCategory(null);
    }
  }, [cartCtx.scrollToCategory]);

  return (
    <div>
      <ParalaxSection />
      <CurtainGallery />
      <div>
        <div ref={sectionsRefs.HagyomanyosTortak} className={classes.section}>
          <CategorySection
            category={"Hagyományos Torták"}
            imageSrc={hagyomanyosTortak}
            description={
              "A hagyományos torták számos kultúrában és országban jelentős szerepet töltenek be ünnepi és különleges alkalmakon. Ezek a desszertek gyakran több generáció receptjei alapján készülnek"
            }
          />
          <CardGalleryTest categories={"HagyomanyosTortak"} CategoryGallery={"CategoryGallery/HagyomanyosTortak"} categoriesName={"Hagyományos torták"} />
        </div>
        <div ref={sectionsRefs.BurkoltTortak} className={classes.section}>
          <CategorySection 
            category={"Burkolt Torták"}
            imageSrc={burkoltTortak}
            description={
              "A burkolt torták különleges és művészi alkotások, amelyeket általában különleges alkalmakra vagy ünnepekre készítenek. A burkolt torták gyakran lenyűgöző megjelenésük miatt népszerűek esküvőkön, születésnapokon és más ünnepi eseményeken."
            }
          />
          <CardGalleryTest categories={"BurkoltTortak"} CategoryGallery={"CategoryGallery/BurkoltTortak"} categoriesName={"Burkolt torták"} />
        </div>
        <div ref={sectionsRefs.Linzertortak} className={classes.section}>
          <CategorySection
            category={"Linzertorták"}
            imageSrc={linzerTortak}
            description={
              "A linzertorta egy hagyományos osztrák sütemény, amelyet általában ünnepekre és különleges alkalmakra készítenek. Ez az ízletes torta rétegekben vagy tésztaként készül, és gyakran málna- vagy ribizlis lekvárral van töltve."
            }
          />
          <CardGalleryTest categories={"Linzertortak"} CategoryGallery={"CategoryGallery/Linzertortak"} categoriesName={"Linzertorták"} />
        </div>
        <div ref={sectionsRefs.Macaronok} className={classes.section}>
          <CategorySection
            category={"Macaronok"}
            imageSrc={macaronok}
            description={
              "A macaronok finom francia édességek, melyek két mandulás piskóta közé töltött krém vagy lekvár réteggel készülnek. Ezek a kis, színes sütemények számos ízben és színben elérhetőek, így sokféle kombinációban kóstolhatóak."
            }
          />
          <CardGalleryTest categories={"Macaronok"} CategoryGallery={"CategoryGallery/Macaronok"} categoriesName={"Macaronok"} />
        </div>
        <div ref={sectionsRefs.HagyomanyosSutemenyek} className={classes.section}>
          <CategorySection
            category={"Hagyományos Sütemények"}
            imageSrc={macaronok}
            description={
              "A hagyományos sütemények hordozzák magukban az évtizedek vagy akár évszázadok alatt kialakult ízek és receptek varázsát. Ezek a finomságok gyakran nemcsak ízükkel, hanem történetükkel is gazdagítják az étkezéseket."
            }
          />
          <CardGalleryTest categories={"HagyomanyosSutemenyek"} CategoryGallery={"CategoryGallery/HagyomanyosSutemenyek"} categoriesName={"Hagyományos sütemények"} />
        </div>
        <div ref={sectionsRefs.MentesSutemenyek} className={classes.section}>
          <CategorySection
            category={"Mentes Sütemények"}
            imageSrc={mentesSutemenyek}
            description={
              "A mentes sütemények olyan különleges édességek, melyek kiváló alternatívát nyújtanak azoknak, akik különböző ételintoleranciával vagy diétás korlátozásokkal küzdenek, például glutén-, tej-, vagy tojásmentes ételeket keresnek. Ezek a sütemények általában kreatív és egészséges összetevőket használnak."
            }
          />
          <CardGalleryTest categories={"MentesSutemenyek"} CategoryGallery={"CategoryGallery/MentesSutemenyek"} categoriesName={"Mentes sütemények"} />
        </div>
        <div ref={sectionsRefs.FondantFigurak} className={classes.section}>
          <CategorySection
            category={"Fondant figurák"}
            imageSrc={fondantFigurak}
            description={
              "A fondant figurák kézműves mestermunkák, melyekkel valódi művészi alkotásokat lehet létrehozni a süteményeken és tortákon. A fondant, egy rugalmas, gyurma-szerű cukormáz, lehetővé teszi a különféle formák és modellek készítését, legyen az virág, állat, vagy akár személyes karakter."
            }
          />
          <CardGalleryTest categories={"FondantFigurak"} CategoryGallery={"CategoryGallery/FondantFigurak"} categoriesName={"Fondant figurák"} />
        </div>
      </div>
      <div className={classes.DesktopSlider}>
        <DesktopSlider />
      </div>
    </div>
  );
}

export default Home;
