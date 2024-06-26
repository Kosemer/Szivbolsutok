/* A Photography egy fotógalériát hoz létre, amelyben a felhasználók kiválaszthatnak különböző témájú fotókat (mint például portré, esküvői, sport, stb.).

A kezdeti állapotban a "portrait" témakör lesz kiválasztva, és a megfelelő képek kerülnek betöltésre a szerverről a fetchImages funkció segítségével. A felhasználók az oldal tetején található menüpontokra kattintva változtathatják meg a jelenleg kiválasztott témakört, ami új képek betöltését váltja ki.

Az oldal tetején lévő menüpontok a különböző handle funkciókat hívják meg a kattintás eseményre, melyek új képek betöltését indítják el a megfelelő mappából, és beállítják a kiválasztott szűrőt a CartContext-ben.

A képek a PhotoGallery komponensben kerülnek megjelenítésre, amit a Photography komponens használ. A képek dinamikusan változnak attól függően, hogy a felhasználó melyik témakört választotta ki. */

import PhotoGallery from "../../Components/PhotoGallery/PhotoGallery";
import classes from "./Photography.module.css";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import CartContext from "../../Components/Store/cart-context";
import AccordionImage from "../../Pages/PhotoGalleryPage/AccordionImage";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

function Photography() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartCtx = useContext(CartContext);

  //Képek lekérdezése szerverről

  const location = useLocation();
  const filterFromState = location.state?.filter;

  //const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaders = useRef({});


  const loadMoreImages = useCallback(async (folder) => {
    console.log(folder)
    setIsLoading(true);
    const imageData = await ImageDimensions(folder);
    cartCtx.setImages((prevImages) => [
      ...prevImages,
      ...imageData.slice(prevImages.length, prevImages.length + 20),
    ]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    
    

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreImages(filterFromState || "HagyomanyosTortak");
      }
    }, options);

    if (loaders.current) {
      observer.observe(loaders.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadMoreImages, filterFromState]);

  useEffect(() => {
    return () => {
      cartCtx.setSelectedFilter("HagyomanyosTortak");
    };
  }, [location.pathname]);

  useEffect(() => {
    if (filterFromState) {
      fetchImages(filterFromState, 20);
      cartCtx.setSelectedFilter(filterFromState);
    } else {
      fetchImages("HagyomanyosTortak", 20);
    }
  }, [filterFromState]);

  async function fetchImages(folder, count) {
    const imageData = await ImageDimensions(folder);
    cartCtx.setImages(imageData.slice(0, count));
  }

  async function fetchAllImages() {
    const folders = [
      "Gallery/HagyomanyosTortak",
      "Gallery/BurkoltTortak",
      "Gallery/Linzertortak",
      "Gallery/Macaronok",
      "Gallery/HagyomanyosSutemenyek",
      "Gallery/MentesSutemenyek",
      "Gallery/FondantFigurak",
    ];
    const allImageData = [];
    for (let folder of folders) {
      const imageData = await ImageDimensions(folder);
      allImageData.push(...imageData);
    }
    cartCtx.setImages(allImageData);
  }

  const loadingSpinner = (
    <div className={classes.loadingSpinner}>
      {isLoading && <LoadingSpinner />}
    </div>
  );

  const handleAllClick = () => {
    fetchAllImages(); // Összes fotó betöltése
    cartCtx.setSelectedFilter("all", 20);
  };

  const handleHagyomanyosTortakClick = () => {
    fetchImages("Gallery/HagyomanyosTortak"); 
    cartCtx.setSelectedFilter("HagyomanyosTortak", 20);
  };
  const handleBurkoltTortakClick = () => {
    fetchImages("Gallery/BurkoltTortak"); 
    cartCtx.setSelectedFilter("BurkoltTortak", 20);
  };
  const handleLinzertortakClick = () => {
    fetchImages("Gallery/Linzertortak"); 
    cartCtx.setSelectedFilter("Linzertortak", 20);
  };
  const handleMacaronokClick = () => {
    fetchImages("Gallery/Macaronok"); 
    cartCtx.setSelectedFilter("Macaronok", 20);
  };
  const handleHagyomanyosSutemenyekClick = () => {
    fetchImages("Gallery/HagyomanyosSutemenyek"); 
    cartCtx.setSelectedFilter("HagyomanyosSutemenyek", 20);
  };
  const handleMentesSutemenyekClick = () => {
    fetchImages("Gallery/MentesSutemenyek"); 
    cartCtx.setSelectedFilter("MentesSutemenyek", 20);
  };
  const handleFondantFigurakClick = () => {
    fetchImages("Gallery/FondantFigurak"); 
    cartCtx.setSelectedFilter("FondantFigurak", 20);
  };

  // images tömb értékének kiíratása a konzolraa

  useEffect(() => {
    console.log("images:", cartCtx.images);
  }, [cartCtx.images]);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      // Ellenőrizzük az ablak szélességét, hogy meghatározzuk, mobil nézetben vagyunk-e
      setIsMobileView(window.innerWidth <= 768); // Vagy más értéket állíthatsz be a mobil szélességhez
    }

    // Az eseménykezelőt hozzáadjuk az ablak méretváltozásához
    window.addEventListener('resize', handleResize);

    // Kezdeti beállítás
    handleResize();

    // Az eseménykezelő eltávolítása a komponens unmountolása előtt
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  return (
    <div className={classes.conatiner}>
      <h2 className={classes.photoTitle}>Galéria</h2>
      {/*<hr className={classes.underline}></hr>*/}
      <div className={isMobileView ? classes.photoFilterMobile : classes.photoFilter}>
        <h2
          onClick={handleAllClick}
          data-selected={cartCtx.selectedFilter === "all"}
        >
          Összes
        </h2>
        <h2
          onClick={handleHagyomanyosTortakClick}
          data-selected={cartCtx.selectedFilter === "HagyomanyosTortak"}
        >
          Hagyományos torták
        </h2>
        <h2
          onClick={handleBurkoltTortakClick}
          data-selected={cartCtx.selectedFilter === "BurkoltTortak"}
        >
          Burkolt torták
        </h2>
        <h2
          onClick={handleLinzertortakClick}
          data-selected={cartCtx.selectedFilter === "Linzertortak"}
        >
          Linzertorták
        </h2>

        <h2
          onClick={handleHagyomanyosSutemenyekClick}
          data-selected={cartCtx.selectedFilter === "HagyomanyosSutemenyek"}
        >
         Hagyományos sütemények
        </h2>
        <h2
          onClick={handleMentesSutemenyekClick}
          data-selected={cartCtx.selectedFilter === "MentesSutemenyek"}
        >
          Mentes sütemények
        </h2>
        <h2
          onClick={handleMacaronokClick}
          data-selected={cartCtx.selectedFilter === "Macaronok"}
        >
          Macaronok
        </h2>
        <h2
          onClick={handleFondantFigurakClick}
          data-selected={cartCtx.selectedFilter === "FondantFigurak"}
        >
          Fondant figurák
        </h2>
      </div>
      <div className={classes.PhotoGallery}>
        <PhotoGallery images={cartCtx.images}></PhotoGallery>
        {loadingSpinner}
        <div ref={(ref) => (loaders.current = ref)} />
      </div>
      <div className={classes.AccordionImage}>
        <AccordionImage></AccordionImage>
      </div>
    </div>
  );
}

export default Photography;
