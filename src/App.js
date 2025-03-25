/* A Routes és Route komponensek a navigációt kezelik, meghatározzák, hogy milyen URL útvonalaknál melyik oldalak (komponensek) jelenjenek meg. Az itt definiált útvonalak alapján a felhasználók a /galeria, /arak, /rolam, /kapcsolat és login URL-eken elérhető oldalakat látják.

Az App komponens a CartProvider kontextusban fut, ami a kosár állapotát kezeli az egész alkalmazásban. Ez lehetővé teszi, hogy a kosár állapota globálisan elérhető legyen az összes komponens számára. */

import Header from "./Components/Layout/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

import CartProvider from "./Components/Store/CartProvider";
import Footer from "./Components/Layout/Footer";
import ScrollToTopButton from "./Components/ScrollToTopButton/ScrollToTopButton";
import ImageUploader from "../src/Components/AdminPage/ImageUploader";
import LoginForm from "./Components/AdminPage/LoginForm";
import CurtainGallery from "./Components/PhotoGallery/CurtainGallery"

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header showCloseButton={true}></Header>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          {/*<Route path="/galeria" element={<Photography></Photography>}></Route>*/}
          <Route path="/galeria" element={<CurtainGallery></CurtainGallery>}></Route>
          <Route path="login" element={<LoginForm></LoginForm>}></Route>
        </Routes>
        <Footer></Footer>
        <ScrollToTopButton></ScrollToTopButton>
      </div>
    </CartProvider>
  );
}

export default App;
