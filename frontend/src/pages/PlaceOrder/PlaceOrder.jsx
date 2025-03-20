import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Alert, Container } from 'react-bootstrap';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function PlaceOrder() {
  const { getTotalCartAmount, token, product_list, cartProduct, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderProducts = [];
    product_list.map((item) => {
      if (cartProduct[item._id] > 0) {
        let productInfo = item;
        productInfo["quantity"] = cartProduct[item._id]
        orderProducts.push(productInfo)
      }
    })
    let orderData = {
      address: data,
      products: orderProducts,
      amount: getTotalCartAmount() + 20,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      Alert("Error")
    }
  }


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <div className='place-order'>
      <Container className='py-5'>
        <hr />
        <Form noValidate validated={validated} onSubmit={(placeOrder, handleSubmit)}>
          <Row >
            <Col md={8} className='pe-5'>
              <h4 className='pb-5'>Delivery Information</h4>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control name='firstName' onChange={onchangeHandler} value={data.firstName}
                    required
                    type="text"
                    placeholder="First name"

                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter First Name.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control name='lastName' onChange={onchangeHandler} value={data.lastName}
                    required
                    type="text"
                    placeholder="Last name"

                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Last Name.
                  </Form.Control.Feedback>
                  <br />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control name='email' onChange={onchangeHandler} value={data.email}
                      type="emai"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a Email.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" placeholder="Street" name='street' onChange={onchangeHandler} value={data.street} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <br />
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" name='city' onChange={onchangeHandler} value={data.city} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom05">  <br />
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="State" name='state' onChange={onchangeHandler} value={data.state} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="City" name='country' onChange={onchangeHandler} value={data.country} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control type="text" placeholder="Zip" required name='zipcode' onChange={onchangeHandler} value={data.zipcode} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom04">  <br />
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" placeholder="Mobile Number" name='phone' onChange={onchangeHandler} value={data.phone} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>

              </Row>



            </Col>

            <Col md={4} className='ps-5'>
              <h4 className='pb-5'>Cart Totals</h4>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>&#8377;{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <b>&#8377;{getTotalCartAmount() === 0 ? 0 : 20}</b>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
              </div>
              <hr />
              <button type='submit' className='button'>Cash On Delivery</button>

            </Col>

          </Row>
        </Form>
      </Container>
    </div>

  )
}

export default PlaceOrder
