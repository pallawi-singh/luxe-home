import React, { useContext } from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Container from 'react-bootstrap/esm/Container'
import ProductList from '../ProductList/ProductList'

const ProductDisplay = ({ category }) => {

    const { product_list } = useContext(StoreContext)

    return (
        <Container>
            <div className='product-display pb-4' id='product-display'>
                <div className="product-display-list">
                    {product_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <ProductList key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        }

                    })}
                </div>
            </div>
        </Container>
    )
}

export default ProductDisplay
