import './App.css';
import Home from './Components/Pages/Home';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import LoginForm from './Components/AdminPage/LoginForm';
import { Route, Routes } from 'react-router-dom';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path='login' element={<LoginForm></LoginForm>}></Route>
      </Routes>
      <Footer></Footer>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}

export default App;
