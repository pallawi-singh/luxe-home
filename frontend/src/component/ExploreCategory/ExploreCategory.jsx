import React from 'react'
import './ExploreCategory.css'
import Container from 'react-bootstrap/Container';
import { category_list } from '../../assets/assets'

const ExploreCategory = ({ category, setCategory }) => {
  return (
    <Container>
      <div className='explore-category' id='explore-category'>

        <div className="explore-category-list">
          {category_list.map((item, index) => {
            return (
              <div onClick={() => setCategory(prev => prev === item.category_name ? "All" : item.category_name)} key={index} className='explore-category-list-item'>
                <img className={category === item.category_name ? "active" : ""} src={item.category_img} alt="" />
                <p>{item.category_name}</p>
              </div>
            )
          })}
        </div>
        <hr />
      </div>

    </Container>
  )
}

export default ExploreCategory
