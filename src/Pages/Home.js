import React, { useEffect, useContext, useRef } from "react";
import classes from "./Home.module.css";
import CartContext from "../Components/Store/cart-context";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CategorySection2 from "../Components/PhotoGallery/CategorySection2";
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
    KlasszikusTortak: useRef(null),
    BurkoltTortak: useRef(null),
    Linzertortak: useRef(null),
    Macaronok: useRef(null),
    KlasszikusSutemenyek: useRef(null),
    MentesSutemenyek: useRef(null),
    FondantFigurak: useRef(null),
    KulonlegesTortak: useRef(null),
  };

  const categoryData = [
    {
      category: "KlasszikusTortak",
      title: "Klasszikus Torták",
      imageSrc: hagyomanyosTortak,
      description:
        "Piskóta és krém rétegezésével készülnek. Kívülről valamilyen krémmel (pl. vajkrém, habtejszín, a torta belsejébe töltött krém, illetve számos különböző elkészítésű krém) kerülnek beborításra.",
      categoriesName: "Hagyományos torták",
      group: "tortak",
    },
    {
      category: "KulonlegesTortak",
      title: "Különleges Torták",
      imageSrc: hagyomanyosTortak,
      description:
        "Piskóta és krém rétegezésével készülnek. Kívülről valamilyen krémmel (pl. vajkrém, habtejszín, a torta belsejébe töltött krém, illetve számos különböző elkészítésű krém) kerülnek beborításra.",
      categoriesName: "Különleges Torták",
      group: "tortak",
    },
    {
      category: "BurkoltTortak",
      title: "Burkolt Torták",
      imageSrc: burkoltTortak,
      description:
        "Rendszerint fondant (ízesített vagy ízesítetlen cukormassza) burkolással készített hagyományos torták, vagy formatorták.",
      categoriesName: "Burkolt Torták",
      group: "tortak",
    },
    {
      category: "Linzertortak",
      title: "Linzertorták",
      imageSrc: linzerTortak,
      description:
        "Omlós édes tésztalapok és krém rétegezésével készülnek, a tetejükön díszítéssel.",
      categoriesName: "Linzertorták",
      group: "tortak",
    },
    {
      category: "Macaronok",
      title: "Macaronok",
      imageSrc: macaronok,
      description:
        "Mandulaliszt, tojásfehérje és cukor felhasználásával készült édes sütemény, amely ízesített, ganache alapú (csokoládé és tejszín) krémmel kerül összeragasztásra.",
      categoriesName: "Macaronok",
      group: "macaronok",
    },
    {
      category: "KlasszikusSutemenyek",
      title: "Klasszikus Sütemények",
      imageSrc: macaronok,
      description: "Hétköznapi alapanyagokból készült különféle sütemények.",
      categoriesName: "Klasszikus Sütemények",
      group: "sutemenyek",
    },
    {
      category: "MentesSutemenyek",
      title: "Mentes Sütemények",
      imageSrc: mentesSutemenyek,
      description:
        "Különböző ételintoleranciával összeegyeztethető, valamint diétás étrendbe illeszthető sütemény alternatívák. Pl. glutén- , tej- , tojás- , cukormentes, teljeskiőrlésű, szénhidrátcsökkentett.",
      categoriesName: "Mentes Sütemények",
      group: "sutemenyek",
    },
    {
      category: "FondantFigurak",
      title: "Fondant figurák",
      imageSrc: fondantFigurak,
      description:
        "Ízesített vagy ízesítetlen cukormasszából készült különféle egyedi figurák.",
      categoriesName: "Fondant figurák",
      group: "fondantFigurak",
    },
  ];
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cartCtx.scrollToCategory) {
      const headerHeight = 50; // Header magassága pixelben
      const element = sectionsRefs[cartCtx.scrollToCategory].current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      cartCtx.setScrollToCategory(null);
    }
  }, [cartCtx.scrollToCategory]);

  return (
    <div>
      <ParalaxSection />
      <CurtainGallery />
      {categoryData.map((data) => (
        <div key={data.category} ref={sectionsRefs[data.category]} className={classes.section}>
          <CategorySection2
            category={data.category}
            categoryTitle={data.title}
            imageSrc={data.imageSrc}
            description={data.description}
            CategoryGallery={`CategoryGallery/${data.category}`}
            categoriesName={data.categoriesName}
            group={data.group}
          />
        </div>
      ))}
      <div className={classes.DesktopSlider}>
        <DesktopSlider />
      </div>
    </div>
  );
}

export default Home;
