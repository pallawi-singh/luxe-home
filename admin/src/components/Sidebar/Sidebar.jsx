import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="siderbar-option">
      
          <p>Add Products</p>
        </NavLink>

        <NavLink to='/list' className="siderbar-option">
          <p>List Products</p>
        </NavLink>
        <NavLink to='/order' className="siderbar-option">
          <p> Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
