import React, { useContext } from 'react'
import './ProductList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/StoreContext.jsx'
import { assets } from '../../assets/assets.js'

const ProductList = ({ id, image, name, description, price }) => {


    const { cartProduct, addToCart, removeToCart, url } = useContext(StoreContext)

    return (
        <div className='product-list'>
            <div className="product-list-img-container">
                <img className='product-img' src={url+"/images/"+image} alt="" />
                {/* <img className='product-img' src={image} alt="" /> */}

                {!cartProduct[id]
                    ?
                    <button className='addtocartbtn' type='button' onClick={() => addToCart(id)} >Add To Cart</button>
                    // <FontAwesomeIcon className='add' icon={faPlus} onClick={() => addToCart(id)} />
                    : <div className='product-counter'>
                        <FontAwesomeIcon icon={faMinus} onClick={() => removeToCart(id)} className='plus-minus-btn' />
                        <p className='quantity'>{cartProduct[id]}</p>
                        <FontAwesomeIcon icon={faPlus} onClick={() => addToCart(id)} className='plus-minus-btn' />
                    </div>
                }
            </div>
            <div className="product-info">
                <div className="product-name-rating">
                    <p>{name}</p>
                    <b className='product-price'>&#8377;{price}</b>
                </div>
                <p className="product-desc"> {description}</p>
               
            </div>
        </div>
    )
}
// ProductList.propTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
// };
export default ProductList
