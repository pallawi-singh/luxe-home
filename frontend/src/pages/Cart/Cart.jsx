import React, { useContext } from 'react'
import './Cart.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom';

function Cart() {

  const { cartProduct, product_list, removeToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (

    <Container>

      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <b>Items</b>
            <b>Title</b>
            <b>Price</b>
            <b>Quantity</b>
            <b>Total</b>
            <b>Remove</b>
          </div>
          <hr />
          {product_list.map((item, index) => {
            if (cartProduct[item._id] > 0) {
              return (
                <>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>&#8377;{item.price}</p>
                    <p>{cartProduct[item._id]}</p>
                    <p>&#8377;{item.price * cartProduct[item._id]}</p>
                    <p onClick={() => removeToCart(item._id)} className='remove'>x</p>
                  </div>
                  <hr />
                </>

              )
            }
          })}
        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <Row>
            <Col sm={6} md={6}>
              <h4>Cart Total</h4>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>&#8377;{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
              </div>
              <hr />
              <button className='button' onClick={() => navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
            </Col>
            <Col md={2}></Col>
            <Col sm={6} md={4} className='order-1'>
              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code,Enter it here</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder='Promo code' />
                    <button className='promo-btn' >Submit</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>


        </div>
      </div>

    </Container >

  )
}

export default Cart;
