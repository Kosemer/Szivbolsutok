import React, { useState } from "react";
import "./NewNavbar.css";
import image1 from "../../Assets/CakesPicture/a_picture_of_a_cake,_and_it_look(2).png";
import image2 from "../../Assets/CakesPicture/a_picture_of_a_cake,_and_it_look(6).png";
import image3 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(11).png";
import image4 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(2).png";
import image5 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(3).png";
import image6 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(5).png";
import image7 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(6).png";
import image8 from "../../Assets/CakesPicture/a_picture_of_a_macaron,_and_it_l(7).png";

const NewNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        
        <input type="checkbox" id="burger-toggle"></input>
        <label for="burger-toggle" class="burger-menu">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </label>
        <div class="menu">
          <div class="menu-inner">
            {/*<ul class="menu-nav">
              <li class="menu-nav-item">
                <a class="menu-nav-link" href="#">
                  <span>
                    <div>Home</div>
                  </span>
                </a>
              </li>
              <li class="menu-nav-item">
                <a class="menu-nav-link" href="#">
                  <span>
                    <div>About</div>
                  </span>
                </a>
              </li>
              <li class="menu-nav-item">
                <a class="menu-nav-link" href="#">
                  <span>
                    <div>Service</div>
                  </span>
                </a>
              </li>
              <li class="menu-nav-item">
                <a class="menu-nav-link" href="#">
                  <span>
                    <div>Team</div>
                  </span>
                </a>
              </li>
            </ul>*/}
           <div class="gallery">
               {/*<div class="title">
                <p>Sora Gallery</p>
              </div>*/}
              <div class="images">
                <a class="image-link" href="#">
                  <div class="image" data-label="Star">
                    <img
                      src={image1}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sun">
                    <img
                      src={image2}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Tree">
                    <img
                      src={image3}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sky">
                    <img
                      src={image4}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sky">
                    <img
                      src={image5}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sky">
                    <img
                      src={image6}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sky">
                    <img
                      src={image7}
                      alt=""
                    ></img>
                  </div>
                </a>
                <a class="image-link" href="#">
                  <div class="image" data-label="Sky">
                    <img
                      src={image8}
                      alt=""
                    ></img>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
