import React from 'react';
import classes from "./DietIconSection.module.css";
import tk from "../../Assets/MentesIcon/TK.png";
import ch from "../../Assets/MentesIcon/CH.png";
import eggFree from "../../Assets/MentesIcon/eggFree2.png";
import gluten from "../../Assets/MentesIcon/gluten2.png";
import milk from "../../Assets/MentesIcon/milk.png";
import sugar from "../../Assets/MentesIcon/sugar.png";

const DietIconSection = () => {
  const icons = [
    { src: tk, alt: "Teljeskiőrlésű", text: "Teljeskiőrlésű" },
    { src: ch, alt: "Szénhidrátcsökkentett", text: "Szénhidrátcsökkentett" },
    { src: eggFree, alt: "Tojásmentes", text: "Tojásmentes" },
    { src: gluten, alt: "Gluténmentes", text: "Gluténmentes" },
    { src: milk, alt: "Tejmentes", text: "Tejmentes" },
    { src: sugar, alt: "Cukormentes", text: "Cukormentes" },
  ];

  return (
    <div className={classes.iconContainer}>
      {icons.map((icon, index) => (
        <div key={index} className={classes.iconWrapper}>
          <img src={icon.src} alt={icon.alt} className={classes.icon} />
          <div className={classes.iconText}>{icon.text}</div>
        </div>
      ))}
    </div>
  );
};

export default DietIconSection;
