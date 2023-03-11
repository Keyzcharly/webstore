import { useEffect } from "react";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from './scenes/home/Home';
import Checkout from "./scenes/checkout/Ckeckout";
import Confirmation from "./scenes/checkout/Confirmation";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Error from "./scenes/global/Error";
import Footer from "./scenes/global/Footer";
import SearchPage from "./scenes/home/SearchPage";


const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='item/:itemId' element={<ItemDetails />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/success' element={<Confirmation />} />
          <Route path='searchpage' element={<SearchPage />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
