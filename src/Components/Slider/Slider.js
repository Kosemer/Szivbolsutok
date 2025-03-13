import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';
import leftArrow from "../../Assets/CakesPicture/leftArrow.png";
import rightArrow from "../../Assets/CakesPicture/rightArrow.png";

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatikus lapozás
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // 5 másodpercenként vált

    return () => clearInterval(timer);
  }, [images.length]);

  // Következő slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  // Előző slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  // Közvetlen ugrás egy slide-ra
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Számoljuk ki a transform értéket
  const getTransform = () => {
    return `translateX(-${currentSlide * 100}%)`;
  };

  return (
    <div className={styles.sliderContainer}>
      {/* Slider képek */}
      <div 
        className={styles.slider}
        style={{ transform: getTransform() }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Navigációs nyilak */}
      <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide}>
        <img src={leftArrow} className={styles.arrow}></img>
      </button>
      <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide}>
      <img src={rightArrow} className={styles.arrow}></img>
      </button>

      {/* Pöttyök */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider; 