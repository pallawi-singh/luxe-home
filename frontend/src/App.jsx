import React, { useState } from "react"
import Header from "./component/Navbar/Header.jsx"
import Banner from "./component/Banner/Banner.jsx"
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from "./component/Footer/Footer.jsx"
import LoginPopup from "./component/LoginPopup/LoginPopup.jsx"



function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Header setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
      </div>


      <Footer />
    </>

  )
}

export default App
