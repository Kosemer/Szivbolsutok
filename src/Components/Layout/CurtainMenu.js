import React, { useState, useContext, useEffect } from 'react';
import styles from './CurtainMenu.module.css';
import CartContext from "../Store/cart-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CurtainMenu = () => {
  const cartCtx = useContext(CartContext);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [overlayClass, setOverlayClass] = useState(styles.overlay);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (cartCtx.menuIsOpen) {
      setOverlayClass(`${styles.overlay} ${styles.overlayOpen}`);
    } else {
      setOverlayClass(`${styles.overlay} ${styles.overlayClose}`);
      
    }
  }, [cartCtx.menuIsOpen]);

  const openNav = () => {
    cartCtx.setMenuIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setMenuIsOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

console.log(overlayClass)

/*Images load*/
  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = await Promise.all([
        fetchImagesFromFolder("menuPictures"),
      ]);

      const combinedImages = imagesData.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setImages(combinedImages);
    };

    fetchImages();
  }, []);

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      return imageData.slice(0, 7); // Change 3 to the number of images you want to display from each folder
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };
  /*Images load*/

  return (
    <div>
      {cartCtx.menuIsOpen && (
        <div id="myNav" className={overlayClass} onClick={closeNav}>
          <div className={styles.overlayContent}>
            <Container>
              <Row className={styles.rowCard}>
                {images.map((image, index) => (
                  <Col key={index} xs={6} md={6} lg={3} className="mb-4">
                    <Card 
                      className={styles.menuCard}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      style={{ transition: 'transform 0.3s', width: '15rem' }}
                    >
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <Card.Img 
                          variant="top" 
                          src={image.src} 
                          alt={image.caption} 
                          style={{ 
                            filter: hoveredImageIndex === index ? 'brightness(1)' : 'brightness(0.7)',
                            transform: hoveredImageIndex === index ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.5s ease-in-out',
                          }}
                        />
                        <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                          <div className="text-center text-white">
                            <h3>{image.title}</h3>
                          </div>
                        </Card.ImgOverlay>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      )}
      <span onClick={openNav}></span>
    </div>
  );
};

export default CurtainMenu;
