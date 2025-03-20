import React, { useState } from 'react'
import './Home.css'
import Banner from '../../component/Banner/Banner'
import ExploreCategory from '../../component/ExploreCategory/ExploreCategory'
import ProductDisplay from '../../component/ProductDisplay/ProductDisplay'
import AppDownload from '../../component/AppDownload/AppDownload'


function Home() {
  const [category, setCategory] = useState("All")




  return (
    <div>
      <Banner />
      <ExploreCategory category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
