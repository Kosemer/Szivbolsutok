import React from "react";
import { Container } from "react-bootstrap";

const SectionWithImage = ({ category, imageSrc }) => {
  return (
    <Container fluid className="mt-5" style={{ "--bs-gutter-x": "0rem", backgroundColor: "rgb(255, 255, 255)" }}>
      <div className="d-flex">
        {/* Kép */}
        <div style={{ flex: 1.8 }}>
          <img
            src={imageSrc} alt={category}
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              filter: 'brightness(0.9)',
              borderRadius: "0 0px 0px 0px",
            }}
          />
        </div>
        {/* Szöveg */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(255, 255, 255)" }}>
          <h1 className="text-center text-black" style={{ fontSize: "3rem", fontFamily: "'Sorts Mill Goudy', serif" }}>{category}</h1>
        </div>
      </div>
    </Container>
  );
};

export default SectionWithImage;
