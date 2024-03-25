import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importáljuk a Bootstrap stíluslapját
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importáljuk a Bootstrap komponenseit

const CardGallery = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://res.cloudinary.com/sepuckett86/image/upload/v1513176680/IMG_5837_xicdt5.jpg" alt="Card image cap" />
            <Card.Body>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* További kártyák... */}
      </Row>
    </Container>
  );
};

export default CardGallery;
