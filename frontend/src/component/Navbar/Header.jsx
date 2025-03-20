import React, { useContext } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { StoreContext } from '../../context/StoreContext.jsx';
import { assets } from '../../assets/assets';
import { useState,useEffect } from 'react';


const Header = ({ setShowLogin }) => {

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);


    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    const [Category, setCategory] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

return (

    <Container fluid className={`py-2 ${isScrolled ? "fixed-navbar" : ""}`} >
        <Container>
            <div className="navbar">
                <Link to='/' className='logo'> <h4 className='logo'>Luxe Home</h4></Link>
                <ul className="navbar-menu">
                    <Link to="/" onClick={() => setCategory("home")} className={Category === "home" ? "active" : ""}>Home</Link>
                    <a href='#explore-category' onClick={() => setCategory("category")} className={Category === "category" ? "active" : ""}>Category</a>
                    <a href='#app-download' onClick={() => setCategory("mobile-app")} className={Category === "mobile-app" ? "active" : ""}>Mobile-app</a>
                    <a href='#footer' onClick={() => setCategory("contact-us")} className={Category === "contact-us" ? "active" : ""}>Contact us</a>
                </ul>
                <div className="navbar-right">
                    {!token ? <Button className='Signin-btn py-2' onClick={() => setShowLogin(true)}>Sign Up/Sign In</Button>
                        : <div className='nav-profile'>
                            <Button className='Signin-btn py-2'>  <img src={assets.profile_pic} alt="profile" />Profile</Button>
                            <ul className="nav-profile-dropdown">
                                <li><img src={assets.bag_icon} alt="profile" /><p>Orders</p></li>

                                <li onClick={logout}><img src={assets.logout_icon} alt="profile" /><p>Logout</p></li>
                            </ul>
                        </div>}

                    <Link to='/cart' className='cart-icon'> <FontAwesomeIcon icon={faCartPlus} /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    {/* <FontAwesomeIcon icon={faSearch} className="cart-icon " /> */}
                </div>
            </div>
        </Container>
        
    </Container>



)
}

export default Header
