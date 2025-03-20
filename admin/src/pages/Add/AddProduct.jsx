import React, { useState } from 'react'
import "./AddProduct.css"
import { assets } from "../../assets/assets"
import axios from 'axios'
import { toast } from 'react-toastify'

const AddProduct = ({ url }) => {



  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Living Room",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/product/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Living Room",
      })
      setImage(false)
      toast.success(response.data.message)
    }

    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" />
          </label>
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" id='image' hidden required />

        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here..' />
        </div>

        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" id="description" rows="6" placeholder='Write about product description'></textarea>
        </div>
        <div className="add-catergory-price">
          <div className="add-catergory-price flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" >
              <option value="Living Room">Living Room</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bath And Laundary">Bath and Laundary</option>
              <option value="Plants">Plants</option>
              <option value="Bed Room">Bed Room</option>
              <option value="Decore">Deore</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='&#8377; 20' />
          </div>
        </div>
        <button type='submit' className='add-button'>ADD </button>
      </form>

    </div>
  )
}

export default AddProduct
