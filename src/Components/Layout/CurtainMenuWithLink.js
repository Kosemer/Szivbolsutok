import React, { useState, useContext, useEffect } from 'react';
import styles from './CurtainMenu.module.css';
import CartContext from "../Store/cart-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const CurtainMenu = () => {
  const cartCtx = useContext(CartContext);
  const [overlayClass, setOverlayClass] = useState(styles.overlay);

  useEffect(() => {
    setOverlayClass(cartCtx.menuIsOpen ? `${styles.overlay} ${styles.overlayOpen}` : `${styles.overlay} ${styles.overlayClose}`);
  }, [cartCtx.menuIsOpen]);

  const openNav = () => {
    cartCtx.setMenuIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setMenuIsOpen(false);
  };

  return (
    <div>
      <div id="myNav" className={overlayClass} onClick={closeNav}>
        <div className={styles.overlayContent}>
          <Container>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Hagyományos torták</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Burkolt torták</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Linzertoták</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Macaronok</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Hagyományos sütemények</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Mentes sütemények</a>
              </Col>
            </Row>
            <Row className={styles.rowCard}>
              <Col>
                <a href="#" className={styles.menuLink}>Fondant Figurák</a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <span onClick={openNav}></span>
    </div>
  );
};

export default CurtainMenu;
