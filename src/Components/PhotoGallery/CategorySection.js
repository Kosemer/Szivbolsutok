import React from "react";
import { Container } from "react-bootstrap";

const SectionWithImage = ({ category, imageSrc }) => {
  return (
    <Container fluid className="mt-5" style={{ "--bs-gutter-x": "0rem" }}>
      <div style={{ height: "100vh", overflow: "hidden" }} className="d-flex align-items-center justify-content-center">
        <img
          src={imageSrc} alt={category}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: 'brightness(0.9)',
          }}
        />
        <h1 className="text-center text-white position-absolute" style={{ fontSize: "4rem", fontFamily: "'Sorts Mill Goudy', serif" }}>{category}</h1>
      </div>
    </Container>
  );
};

export default SectionWithImage;
