import React from 'react'
import './Banner.css'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function Banner() {
    return (
        <div>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/banner_1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h4 className="text-lighter bg-green py-2">Bring Home The New <br /> for look that refreshing!
                        </h4>
                        <Button type="button" className="border-0 py-2 px-4 fw-bold Skew-btn">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/banner_2.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h4 className="text-lighter bg-green py-2">Bring Home The New <br /> for look that refreshing!
                        </h4>
                        <Button type="button" className="border-0 py-2 px-4 fw-bold Skew-btn">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/banner_3.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h4 className="text-lighter bg-green py-2">Bring Home The New <br /> for look that refreshing!
                        </h4>
                        <Button type="button" className="border-0 py-2 px-4 fw-bold Skew-btn">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Banner
