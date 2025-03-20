import React from 'react'
import './Footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook } from '@fortawesome/free-brands-svg-icons'



const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <Container>
                <Row className="footer-content">
                    <Col sm={12} md={6}>

                        <div className="footer-content-left">
                            <h3 className='Logo'>Luxe Home</h3>
                            <h5>Choosing The Perfect Home Décor Items</h5>
                            <p>Pepperfry has a wide collection of decorative items for home. This ensures there is something for every home. However, given so many options to choose from, picking the right products can be a challenge. Following are a few pointers to keep in mind for choosing the perfect home décor items:</p>
                            <div className="social-icon">

                                {/* <FontAwesomeIcon icon={faFacebook} className="m-auto ms-4 " /> */}

                            </div>
                        </div>
                    </Col>

                    <Col sm={6} md={2}>
                        <div className="footer-content-center">
                            <h4>COMPANY</h4>
                            <ul className='p-0'>
                                <li>Home</li>
                                <li>About</li>
                                <li>Delivery</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </Col>

                    <Col sm={6} md={2}>
                        <div className="footer-content-right">
                            <h4>GET IN TOUCH</h4>
                            <ul className='p-0'>
                                <li>+91 7701859636</li>
                                <li>pallawikumari2403@gmail.com</li>
                            </ul>
                        </div>
                    </Col>

                </Row>
                <hr />
                <p className="footer-copyright">
                    Copyright 2024 	&copy; Luxehome.com - All Right Reserved.
                </p>

            </Container >
        </div>
    )
}

export default Footer
