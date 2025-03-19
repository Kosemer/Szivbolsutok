import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Slides from "./OpinionData.js";

// Import Swiper styles
import "swiper/css";
import './DesktopSwiperManual.css'
import "swiper/css/navigation";

import classes from "./DesktopSlider.module.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

const DesktopSlider = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlidesPerView(1); // Mobil
      } else if (window.innerWidth <= 768) {
        setSlidesPerView(2); // Kisebb tablet
      } else if (window.innerWidth <= 960) {
        setSlidesPerView(3); // Nagyobb tablet
      } else if (window.innerWidth <= 1366) {
        setSlidesPerView(4); // Átlagos asztali
      } else if (window.innerWidth <= 2048) {
        setSlidesPerView(5); // 2K kijelző
      } else if (window.innerWidth <= 3840) {
        setSlidesPerView(6); // 4K kijelző
      } else {
        setSlidesPerView(7); // Extra nagy kijelzők
      }
    };
    
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
    <h1 className={classes.opinionTitle}>Vélemények</h1>

    {!isMobile && (
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={slidesPerView}
        centeredSlides={false}
        autoplay={{
          delay: 6000,
        }}
        spaceBetween={40}
        pagination={{
          type: "fraction",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className={`${classes.swiper} ${classes.desktopSwiper}`}
      >
        {Slides.map((slide, index) => (
          <SwiperSlide key={index} className={classes["swiper-slide"]}>
            {slide}
          </SwiperSlide>
        ))}
        <div
          className="swiper-button-next"
          style={{ color: "white" }}
        ></div>
        <div
          className="swiper-button-prev"
          style={{ color: "white" }}
        ></div>
      </Swiper>
    )}

    {isMobile && (
      <Swiper
        slidesPerView={slidesPerView}
        centeredSlides={false}
        autoplay={{
          delay: 6000,
        }}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className={`${classes.swiper} ${classes.mobileSwiper}`}
      >
        {Slides.map((slide, index) => (
          <SwiperSlide key={index} className={classes["swiper-slide"]}>
            {slide}
          </SwiperSlide>
        ))}
        <div
          className="swiper-button-next"
          style={{ color: "white" }}
        ></div>
        <div
          className="swiper-button-prev"
          style={{ color: "white" }}
        ></div>
      </Swiper>
    )}
  </div>
  );
};

export default DesktopSlider;
