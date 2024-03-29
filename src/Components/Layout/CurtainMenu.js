import React, { useState, useContext } from 'react';
import styles from './CurtainMenu.module.css';
import CartContext from "../Store/cart-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CurtainMenu = () => {


  const cartCtx = useContext(CartContext);

  const openNav = () => {
    cartCtx.setMenuIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setMenuIsOpen(false);
  };

  console.log(cartCtx.menuIsOpen)

 
  return (
    <div>
      {cartCtx.menuIsOpen && (
        <div id="myNav" className={styles.overlay}>
          <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>
            &times;
          </a>
          <div className={styles.overlayContent}>
          <Container fluid className="mt-5">
            <h1>fsdfdfsdfds</h1>
      <Row>
        {cartCtx.images.map((image, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-4">
            <Card className="shadow"> {/* Árnyékolás hozzáadva */}
              <Card.Img variant="top" src={image.src} alt={image.caption} />
              <Card.Body className="text-center">
                <Card.Text>{image.title}</Card.Text>
              </Card.Body>
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
