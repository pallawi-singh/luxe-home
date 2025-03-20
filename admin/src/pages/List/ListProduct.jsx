import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const ListProduct = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);

      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      // console.log(productId)
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>&#8377;{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='remove-icon'>X</p>
            </div>
          )
        })}
      </div>
    </div>

  );
};

export default ListProduct;
