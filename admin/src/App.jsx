import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import AddProduct from './pages/Add/AddProduct'
import ListProduct from './pages/List/ListProduct'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = "http://localhost:4000";


  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddProduct url={url}/>}/>
          <Route path="/list" element={<ListProduct  url={url}/>} />
          <Route path="/order" element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
