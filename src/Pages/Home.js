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
              "Piskóta és krém rétegezésével készülnek. Kívülről valamilyen krémmel (pl. vajkrém, habtejszín, a torta belsejébe töltött krém, illetve számos különböző elkészítésű krém) kerülnek beborításra."
            }
          />
          <CardGalleryTest categories={"HagyomanyosTortak"} CategoryGallery={"CategoryGallery/HagyomanyosTortak"} categoriesName={"Hagyományos torták"} />
        </div>
        <div ref={sectionsRefs.BurkoltTortak} className={classes.section}>
          <CategorySection 
            category={"Burkolt Torták"}
            imageSrc={burkoltTortak}
            description={
              "Rendszerint fondant (ízesített vagy ízesítetlen cukormassza) burkolással készített hagyományos torták, vagy formatorták."
            }
          />
          <CardGalleryTest categories={"BurkoltTortak"} CategoryGallery={"CategoryGallery/BurkoltTortak"} categoriesName={"Burkolt torták"} />
        </div>
        <div ref={sectionsRefs.Linzertortak} className={classes.section}>
          <CategorySection
            category={"Linzertorták"}
            imageSrc={linzerTortak}
            description={
              "Omlós édes tésztalapok és krém rétegezésével készülnek, a tetejükön díszítéssel."
            }
          />
          <CardGalleryTest categories={"Linzertortak"} CategoryGallery={"CategoryGallery/Linzertortak"} categoriesName={"Linzertorták"} />
        </div>
        <div ref={sectionsRefs.Macaronok} className={classes.section}>
          <CategorySection
            category={"Macaronok"}
            imageSrc={macaronok}
            description={
              "Mandulaliszt, tojásfehérje és cukor felhasználásával készült édes sütemény, amely ízesített, ganache alapú (csokoládé és tejszín) krémmel kerül összeragasztásra."
            }
          />
          <CardGalleryTest categories={"Macaronok"} CategoryGallery={"CategoryGallery/Macaronok"} categoriesName={"Macaronok"} />
        </div>
        <div ref={sectionsRefs.HagyomanyosSutemenyek} className={classes.section}>
          <CategorySection
            category={"Hagyományos Sütemények"}
            imageSrc={macaronok}
            description={
              "Hétköznapi alapanyagokból készült különféle sütemények."
            }
          />
          <CardGalleryTest categories={"HagyomanyosSutemenyek"} CategoryGallery={"CategoryGallery/HagyomanyosSutemenyek"} categoriesName={"Hagyományos sütemények"} />
        </div>
        <div ref={sectionsRefs.MentesSutemenyek} className={classes.section}>
          <CategorySection
            category={"Mentes Sütemények"}
            imageSrc={mentesSutemenyek}
            description={
              "Különböző ételintoleranciával összeegyeztethető, valamint diétás étrendbe illeszthető sütemény alternatívák. Pl. glutén- , tej- , tojás- , cukormentes, teljeskiőrlésű, szénhidrátcsökkentett."
            }
          />
          <CardGalleryTest categories={"MentesSutemenyek"} CategoryGallery={"CategoryGallery/MentesSutemenyek"} categoriesName={"Mentes sütemények"} />
        </div>
        <div ref={sectionsRefs.FondantFigurak} className={classes.section}>
          <CategorySection
            category={"Fondant figurák"}
            imageSrc={fondantFigurak}
            description={
              "Ízesített vagy ízesítetlen cukormasszából készült különféle egyedi figurák."
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
