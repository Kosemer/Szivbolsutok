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


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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
        slidesPerView={3}
        centeredSlides={false}
        autoplay={{
          delay: 6000,
        }}
        spaceBetween={50}
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
        slidesPerView={1}
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
