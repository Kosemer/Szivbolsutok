import React, { useEffect, useContext, useRef } from "react";
import classes from "./Home.module.css";
import CartContext from "../Components/Store/cart-context";
import DesktopSlider from "../Components/UI/OpinionSwiper/DesktopSlider";
import CardGalleryTest from "../Components/PhotoGallery/CardGalleryTest";
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
    HagyomanyosTortak: useRef(null),
    BurkoltTortak: useRef(null),
    Linzertortak: useRef(null),
    Macaronok: useRef(null),
    HagyomanyosSutemenyek: useRef(null),
    MentesSutemenyek: useRef(null),
    FondantFigurak: useRef(null),
    KulonlegesTortak: useRef(null),
  };

  const categoryData = [
    {
      category: "HagyomanyosTortak",
      title: "Klasszikus Torták",
      imageSrc: hagyomanyosTortak,
      description:
        "Piskóta és krém rétegezésével készülnek...",
      categoriesName: "Hagyományos torták",
    },
    {
      category: "KulonlegesTortak",
      title: "Különleges Torták",
      imageSrc: hagyomanyosTortak,
      description:
        "Piskóta és krém rétegezésével készülnek...",
      categoriesName: "Különleges Torták",
    },
    {
      category: "BurkoltTortak",
      title: "Burkolt Torták",
      imageSrc: burkoltTortak,
      description:
        "Rendszerint fondant burkolással készített...",
      categoriesName: "Burkolt Torták",
    },
    {
      category: "Linzertortak",
      title: "Linzertorták",
      imageSrc: linzerTortak,
      description:
        "Omlós édes tésztalapok és krém rétegezésével...",
      categoriesName: "Linzertorták",
    },
    {
      category: "Macaronok",
      title: "Macaronok",
      imageSrc: macaronok,
      description:
        "Mandulaliszt, tojásfehérje és cukor felhasználásával...",
      categoriesName: "Macaronok",
    },
    {
      category: "HagyomanyosSutemenyek",
      title: "Klasszikus Sütemények",
      imageSrc: macaronok,
      description: "Hétköznapi alapanyagokból készült...",
      categoriesName: "Klasszikus Sütemények",
    },
    {
      category: "MentesSutemenyek",
      title: "Mentes Sütemények",
      imageSrc: mentesSutemenyek,
      description:
        "Különböző ételintoleranciával összeegyeztethető...",
      categoriesName: "Mentes Sütemények",
    },
    {
      category: "FondantFigurak",
      title: "Fondant figurák",
      imageSrc: fondantFigurak,
      description:
        "Ízesített vagy ízesítetlen cukormasszából...",
      categoriesName: "Fondant figurák",
    },
  ].map((item, index) => ({
    ...item,
    secondSections: index % 2 === 1, // Minden második elem `true`
  }));
  
  
  

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
            secondSections={data.secondSections}
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
