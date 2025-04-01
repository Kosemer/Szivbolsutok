import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ResizeImage from "./ResizeImage";
import classes from "./ImageUploader.module.css";
import StorageInfo from "./StorageInfo";
import otimalization from "./otimalization.svg";
import upload from "./upload.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import DraggableImage from "./DraggableImage";
import darkModeClasses from "./DarkMode.module.css";
import DarkModeButton from "./DarkModeButton";
import CartContext from "../../Components/Store/cart-context";
import DeleteImage from "./DeleteImage";
import DietIconSectionAdminPage from "./DietIconSectionAdminPage";
import { useNavigate } from 'react-router-dom';

const ImageUploader = ({ setLoggedIn }) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const [characterCount, setCharacterCount] = useState(0);
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);
  const [isImageNameError, setIsImageNameError] = useState(false);

  // Eseménykezelő a beírt szöveg változásához
  const handleChange = (e) => {
    const inputValue = e.target.value;
    cartCtx.setImageName(inputValue); // Állítsa be a kép nevét a kontextusban
    setCharacterCount(inputValue.length); // Frissíti a karakter számlálót
    setIsNameInputTouched(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const handleResizeSuccess = (newSize) => {
    cartCtx.setResizeSuccess(true);
    cartCtx.setImageResized(true);
    cartCtx.setSelectedFile((prevFile) => {
      const newFile = new File([prevFile], prevFile.name, {
        type: prevFile.type,
      });
      newFile.resized = true;
      return newFile;
    });
    const newSizeInMB = (newSize / (1024 * 1024)).toFixed(2);
    cartCtx.setImageSize(newSizeInMB); // Frissíti az imageSize értékét az új méretre
    cartCtx.setShowWarningImageSize(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the error state
    setIsImageNameError(false);

    if (
      !cartCtx.selectedFile ||
      !cartCtx.selectedFolder ||
      cartCtx.selectedFile.size === 0 ||
      !cartCtx.imageName
    ) {
      // Get the position of the image name input
      const inputElement = document.getElementById("imageName");
      if (inputElement) {
        const rect = inputElement.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const middleOfScreen = window.innerHeight / 2;
        const targetScrollPosition = scrollY + rect.top + rect.height / 2 - middleOfScreen;

        window.scrollTo({
          top: targetScrollPosition,
          behavior: "smooth",
        });
      }
    }

    if (!cartCtx.selectedFile || cartCtx.selectedFile.size === 0) {
      cartCtx.setFileError("Válassz ki egy fájlt");
    } else {
      cartCtx.setFileError(null);
    }

    if (!cartCtx.selectedFolder) {
      cartCtx.setFolderError("Válassz ki egy mappát");
    } else {
      cartCtx.setFolderError(null);
    }

    if (!cartCtx.imageName && cartCtx.selectedFolder) {
      cartCtx.setImageNameError("Mi legyen a kép neve?");
      setIsImageNameError(true);
    } else {
      cartCtx.setImageNameError(null);
    }

    if (
      cartCtx.selectedIcons &&
      cartCtx.selectedFolder === "MentesSutemenyek"
    ) {
      cartCtx.setSelectedIconsError("Biztos nem választasz ki semmit?");
    } else {
      cartCtx.setSelectedIconsError(null);
    }

    if (
      !cartCtx.selectedFile ||
      !cartCtx.selectedFolder ||
      cartCtx.selectedFile.size === 0 ||
      !cartCtx.imageName
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("image", cartCtx.selectedFile);
    formData.append("folder", cartCtx.selectedFolder);
    const imageNameWithIcons =
      cartCtx.selectedIcons.length > 0
        ? `${cartCtx.imageName}(${cartCtx.selectedIcons.join(", ")})`
        : cartCtx.imageName;
    formData.append("imageName", imageNameWithIcons);

    const response = await axios.post(
      "https://www.szivbolsutok.hu/backend/uploadImage.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    cartCtx.setUploadSuccess(true);
    await loadImages();
    cartCtx.resetImageUploader();
    cartCtx.setImageName(""); // Reset the image name after upload
    cartCtx.setSelectedIcons([]);
    cartCtx.setSelectedIconsError(null);
    setCharacterCount(0);
  };

  useEffect(() => {
    if (cartCtx.uploadSuccess) {
      setTimeout(() => cartCtx.setUploadSuccess(false), 2000);
    }
  }, [cartCtx.uploadSuccess]);

  const loadImages = async () => {
    try {
      console.log('Selected folder:', cartCtx.selectedFolder);
      const response = await axios.get(
        `https://www.szivbolsutok.hu/backend/listImages.php?folder=${cartCtx.selectedFolder}`
      );
      
      if (response.data) {
        // Csak a '../' prefixet távolítjuk el
        let modifiedImages = response.data.map(imagePath => 
          imagePath.replace('../', '')
        );
        console.log('Server returned images:', modifiedImages);

        // Betöltjük a mentett sorrendet
        try {
          const orderResponse = await axios.get('https://www.szivbolsutok.hu/backend/getImageOrder.php');
          if (orderResponse.data && orderResponse.data[cartCtx.selectedFolder]) {
            // Ha van mentett sorrend, azt használjuk
            const savedOrder = orderResponse.data[cartCtx.selectedFolder];
            console.log('Saved order:', savedOrder);
            
            // Először az elmentett sorrendben lévő képeket vesszük
            const orderedImages = savedOrder.filter(img => modifiedImages.includes(img));
            
            // Majd hozzáadjuk azokat a képeket, amik nincsenek a mentett sorrendben
            const newImages = modifiedImages.filter(img => !savedOrder.includes(img));
            console.log('New images to add:', newImages);
            
            modifiedImages = [...orderedImages, ...newImages];
          }
        } catch (error) {
          console.error('Error loading image order:', error);
        }

        console.log('Final image order:', modifiedImages);
        cartCtx.setFolderImages(modifiedImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  useEffect(() => {
    console.log("Selected folder changed:", cartCtx.selectedFolder); // Debugging line
    if (cartCtx.selectedFolder) {
      loadImages();
    }
  }, [cartCtx.selectedFolder]);

  const handleImageClick = async (image) => {
    // A szerver maga hozzáadja az '../assets/' prefixet, így nekünk csak a relatív útvonalat kell küldenünk
    cartCtx.setImageToDelete(image);
    cartCtx.setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    cartCtx.setSelectedFile(e.target.files[0]);
    cartCtx.setInputValue(e.target.value);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        cartCtx.setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      const fileSizeInMB = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
      cartCtx.setImageSize(fileSizeInMB);
      cartCtx.setIsOpenResize(fileSizeInMB > 1.4);
      // Állítsd be a showWarning állapotot, ha a méret nagyobb, mint 6 MB
      cartCtx.setShowWarningImageSize(fileSizeInMB > 1.4);
      cartCtx.setResizeSuccess(false);
      cartCtx.setFileError(null);
    } else {
      cartCtx.setImagePreview(null);
      cartCtx.setImageSize(null);
      cartCtx.setShowWarningImageSize(false);
      cartCtx.setIsOpenResize(false);
    }
  };

  useEffect(() => {
    cartCtx.setIsOpen(window.innerWidth >= 768);
    cartCtx.setIsOpenResize(window.innerWidth >= 768);
    cartCtx.setIsMobile(window.innerWidth >= 768);
  }, []);

  const toggleOpen = () => cartCtx.setIsOpen(!cartCtx.isOpen);
  const currentClasses = `${
    cartCtx.isOpen
      ? cartCtx.isDarkMode
        ? darkModeClasses.storageInfoOpen
        : classes.storageInfoOpen
      : cartCtx.isDarkMode
      ? darkModeClasses.storageInfoClosed
      : classes.storageInfoClosed
  }`;

  const toggleOpenResize = () => cartCtx.setIsOpenResize(!cartCtx.isOpenResize);
  const currentClassesResize = `${
    cartCtx.isOpenResize
      ? cartCtx.isDarkMode
        ? darkModeClasses.storageInfoOpen
        : classes.storageInfoOpen
      : cartCtx.isDarkMode
      ? darkModeClasses.storageInfoClosed
      : classes.storageInfoClosed
  }`;

  const selectedFolder =
    cartCtx.selectedFolder === "slider" ||
    cartCtx.selectedFolder === "sliderMobile" ? (
      <div className={classes.imageUploadInfoText}>
        <p>
          <span>Infó a képfeltöltéshez!</span>
          <br></br>
          <br></br>A slider úgy van kialakítva, hogy asztali nézetben a fekvő
          képek, míg mobil nézetben függőlegesen a teljes képernyőt kitöltő
          állóképek a preferáltak.
        </p>
      </div>
    ) : null;

  const imageDeleteInfoMobileView = !cartCtx.isMobile &&
    cartCtx.selectedFolder && (
      <div className={classes.imageUploadInfoText}>
        <p>Kép törléséhez koppints a törölni kívánt képre!</p>
      </div>
    );

  const imageDeleteFeedback = cartCtx.uploadSuccess && (
    <p className={classes.successMessage}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{ fontSize: "2em", marginRight: "10px" }}
      />
      Sikeres feltöltés
    </p>
  );

  const imageUploadFeedback = cartCtx.deleteSuccess && (
    <p className={classes.successMessage}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{ fontSize: "2em", marginRight: "10px" }}
      />
      Sikeres törlés
    </p>
  );

  const successfulOptimization = cartCtx.resizeSuccess && (
    <p className={classes.successMessage}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{ fontSize: "2em", marginRight: "10px" }}
      />
      Sikeres optimalizálás
    </p>
  );

  // Új függvény a képek átrendezéséhez
  const handleDragDrop = async (dragIndex, dropIndex) => {
    const newImages = [...cartCtx.folderImages];
    const draggedImage = newImages[dragIndex];
    
    // Töröljük a régi pozícióból és beszúrjuk az újba
    newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    // Frissítjük a state-et
    cartCtx.setFolderImages(newImages);

    // Mentjük a szervernek az új sorrendet
    try {
      await axios.post('https://www.szivbolsutok.hu/backend/saveImageOrder.php', {
        folder: cartCtx.selectedFolder,
        images: newImages
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Image order saved successfully');
    } catch (error) {
      console.error('Error saving image order:', error);
    }
  };
  

  return (
    <div
      className={
        cartCtx.isDarkMode ? darkModeClasses.container : classes.container
      }
    >
      <div className={classes.buttonRow}>
        <DarkModeButton
          className={classes.darkModeButton}
          onClick={() => cartCtx.setIsDarkMode((prevMode) => !prevMode)}
          isDarkMode={cartCtx.isDarkMode}
        ></DarkModeButton>
        <div className={classes.navigationButtons}>
          <button className={classes.homeButton} onClick={navigateToHome}>
            Főoldal
          </button>
          <button className={classes.logoutButton} onClick={handleLogout}>
            Kijelentkezés
          </button>
        </div>
      </div>
      <form className={classes.formContainer}>
        <div
          className={
            cartCtx.isDarkMode ? darkModeClasses.uploadFile : classes.uploadFile
          }
        >
          <div className={classes.svg}>
            <img src={upload} alt="upload Icon" />
          </div>
          <h3>Kép feltöltése</h3>
          <div className={classes.fileWrapper}>
            <input
              id="fileUpload"
              type="file"
              className={classes.fileInput}
              value={cartCtx.inputValue}
              onChange={handleFileChange}
            />
            <label className={classes.fileLabel} htmlFor="fileUpload">
              <span className={classes.fileLabelText}>
                {cartCtx.selectedFile
                  ? cartCtx.selectedFile.name
                  : "Válassz fájlt..."}
              </span>
              <span className={classes.fileButton}>Tallózás</span>
            </label>
            {cartCtx.fileError && (
              <div className={classes.error}>{cartCtx.fileError}</div>
            )}
          </div>
          <div>
            {cartCtx.imagePreview && (
              <img
                src={cartCtx.imagePreview}
                alt="Előnézet"
                className={classes.imagePreview}
              />
            )}
          </div>
          {cartCtx.imageSize && (
            <p className={classes.pictureSize}>
              A kiválasztott kép mérete:{" "}
              <strong
                className={
                  cartCtx.showWarningImageSize
                    ? classes.warningText
                    : classes.goodSize
                }
              >
                {cartCtx.imageSize} MB
              </strong>
            </p>
          )}
          {cartCtx.showWarningImageSize && (
            <p className={classes.warningText}>Javasolt a kép optimalizálása</p>
          )}
          <select
            value={cartCtx.selectedFolder}
            onChange={(e) => {
              cartCtx.setSelectedFolder(e.target.value);
              if (e.target.value) {
                cartCtx.setFolderError(null);
              }
            }}
            className={classes.select}
          >
            <option value="">Válassz mappát</option>
            <optgroup label="Galéria">
              <option value="Gallery/HagyomanyosTortak">Klasszikus torták</option>
              <option value="Gallery/KulonlegesTortak">Különleges torták</option>
              <option value="Gallery/BurkoltTortak">Burkolt torták</option>
              <option value="Gallery/Linzertortak">Linzertorták</option>
              <option value="Gallery/Macaronok">Macaronok</option>
              <option value="Gallery/HagyomanyosSutemenyek">
                Klasszikus sütemények
              </option>
              <option value="Gallery/MentesSutemenyek">Mentes sütemények</option>
              <option value="Gallery/FondantFigurak">Fondant figurák</option>
            </optgroup>
            <optgroup label="Főoldal, kategóriák képei">
              <option value="CategoryGallery/HagyomanyosTortak">
                Klasszikus torták
              </option>
              <option value="CategoryGallery/KulonlegesTortak">
              Különleges torták
              </option>
              <option value="CategoryGallery/BurkoltTortak">Burkolt torták</option>
              <option value="CategoryGallery/Linzertortak">Linzertorták</option>
              <option value="CategoryGallery/Macaronok">Macaronok</option>
              <option value="CategoryGallery/HagyomanyosSutemenyek">
              Klasszikus sütemények
              </option>
              <option value="CategoryGallery/MentesSutemenyek">
                Mentes sütemények
              </option>
              <option value="CategoryGallery/FondantFigurak">Fondant figurák</option>
            </optgroup>
          </select>
          {cartCtx.folderError && (
            <div className={classes.error}>{cartCtx.folderError}</div>
          )}
          {cartCtx.selectedFile && (
            <div className={classes.inputWrapper}>
              <input
                id="imageName"
                type="text"
                value={cartCtx.imageName}
                onChange={handleChange}
                className={`${classes.imageNameInput} ${!cartCtx.imageName && isImageNameError ? classes.errorInput : ''}`}
                placeholder="Mi legyen a kép neve?"
                onFocus={() => setIsNameInputTouched(true)}
              />
              {cartCtx.imageNameError && (
                <div className={classes.error}>{cartCtx.imageNameError}</div>
              )}
              <div
                className={`${classes.numberOfCharacters} ${
                  characterCount > 20 ? classes.redText : ""
                }`}
              >
                Karakterek száma: {characterCount}
              </div>
              <div>
                Az optimális megjelenés érdekében a képek neve ne legyen 20 karakternél több.
              </div>
            </div>
          )}

          <div
            className={classes.dietBox}
            style={{
              display:
                cartCtx.selectedFolder.includes("MentesSutemenyek")
                  ? "block"
                  : "none",
            }}
          >
            <div className={classes.dietTitle}>
              Válassz egy vagy több kategóriát.
            </div>
            <DietIconSectionAdminPage></DietIconSectionAdminPage>
          </div>
          {cartCtx.selectedIconsError && (
            <div className={classes.error}>{cartCtx.selectedIconsError}</div>
          )}
        </div>
        <div className={currentClassesResize} onClick={toggleOpenResize}>
          <div
            className={
              cartCtx.isDarkMode
                ? darkModeClasses.resizeImage
                : classes.resizeImage
            }
          >
            <div className={classes.svg2}>
              <img src={otimalization} alt="otimalization Icon" />
            </div>

            <ResizeImage
              imageFile={cartCtx.selectedFile}
              setImageFile={cartCtx.setSelectedFile}
              onResizeSuccess={handleResizeSuccess}
              selectedFile={cartCtx.selectedFile}
              isOpenResize={cartCtx.isOpenResize}
            />
            {successfulOptimization}
          </div>
        </div>
        <div className={currentClasses} onClick={toggleOpen}>
          <StorageInfo
            isDarkMode={cartCtx.isDarkMode}
            isOpen={cartCtx.isOpen}
          ></StorageInfo>
        </div>
      </form>
      <div className={classes.buttonContainer}>
        <button
          className={classes.uploadButton}
          type="button"
          onClick={handleSubmit}
        >
          Kép feltöltése
        </button>
        <button
          className={classes.resetButton}
          type="button"
          onClick={() => {
            cartCtx.resetButton();
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Mégse
        </button>
      </div>
      {imageDeleteFeedback}
      {imageUploadFeedback}
      {imageDeleteInfoMobileView}
      {selectedFolder}
      {cartCtx.folderImages.length > 0 && (
        <div className={cartCtx.isDarkMode ? darkModeClasses.imageGrid : classes.imageGrid}>
          {cartCtx.folderImages.map((image, index) => (
            <div key={index}>
              <DraggableImage
                index={index}
                image={image}
                handleImageClick={handleImageClick}
                loadImages={loadImages}
                onDragDrop={handleDragDrop}
              />
              <DeleteImage loadImages={loadImages} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
