import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h3 className='logo'>Luxe Home<span>Admin Panel</span></h3>
      <img src={assets.profilepic} alt="profile pic" />
    </div>
  )
}

export default Navbar
