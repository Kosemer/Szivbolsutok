import React, { useState, useContext } from 'react';
import styles from './CurtainMenu.module.css';
import CartContext from "../Store/cart-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CurtainMenu = () => {

  const cartCtx = useContext(CartContext);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

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

  return (
    <div>
      {cartCtx.menuIsOpen && (
        <div id="myNav" className={styles.overlay}>
          <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>
            &times;
          </a>
          <div className={styles.overlayContent}>
            <Container fluid>
              <Row>
                {cartCtx.images.map((image, index) => (
                  <Col key={index} xs={12} md={6} lg={3} className="mb-4">
                    <Card 
                      className="shadow" 
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      style={{ transition: 'transform 0.3s' }}
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
      <span onClick={openNav}>open</span>
    </div>
  );
};

export default CurtainMenu;