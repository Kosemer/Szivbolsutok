import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useContext } from "react";
import CartContext from "../../Components/Store/cart-context";

const CardGallery = () => {
  const cartCtx = useContext(CartContext);

  return (
    <Container fluid className="mt-5">
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
  );
};

export default CardGallery;
