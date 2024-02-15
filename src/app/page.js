"use client";
import React, { useState, useEffect } from 'react';
import { HeroBanner, FooterBanner, Category } from './components'
const Home = () => {
  const [categories, setCategories ] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [bannerProduct, setBannerProduct] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('/api/getCategories');
        const { categories, bannerData} = await response.json();
        // const matchingProduct = products.find(item => item._id === bannerData[0].product._ref);

        // // If a matching product is found, setBannerProduct to that product
        // if (matchingProduct) {
        //     setBannerProduct(matchingProduct);
        // }
console.log(bannerData)

        setCategories(categories);
        setBannerData(bannerData);
        // console.log(products)
        // console.log(bannerData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>

      <HeroBanner heroBanner={bannerData.length && bannerData[0]} bannerPrd={bannerProduct} />
      <div className="products-heading">
        <h2>Best selling product</h2>
        <p>dining tables of many variations</p>
      </div>
      <div className="products-container">
        {categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
      <FooterBanner bannerPrd={bannerProduct} footerBanner={bannerData && bannerData[0]} />

    </>
  );
};

export default Home;