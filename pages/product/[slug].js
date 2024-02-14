"use client";
import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext';
// import {Toaster} from 'react-hot-toast';
import { client, urlFor } from '../../lib/client'
// import "../../src/app/globals.css";
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import { AiOutlineMinus, AiOutlineplus, AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import Product from '../../src/app/components/Product';
// import ComfortIndicator from '../../src/app/components/ComfortIndicator';

const ProductDetails = ({ product, products }) => {


    if (!product) {
        return <div>Product not found</div>;
    }


    const [imageOfIndex, setImageOfIndex] = useState(false);

    const [index, setIndex] = useState(0);
    const [indexColors, setIndexColors] = useState(0);

    const [selected, setSelected] = useState(2); // Medium by default
    const [selectedSizePrice, setSelectedSizePrice] = useState(0); // Medium by default

    const { onAdd, decQty, incQty, qty, setShowCart, selectedSize, setSelectedSize, setSelectedSizes, setTotalPrice, selectedSizes } = useStateContext();
    console.log(selectedSizes)
    useEffect(() => {

        const selectElement = document.getElementById('mySelect');
        console.log(selectElement.options)

        // Store the original selected value

        console.log(selectElement.options)

        setSelectedSize(selectElement.options[0].value)
        if (prices) {
            setSelectedSizePrice(prices[0].price)

            product['price'] = prices[0].price


        }


    }, [])


    const handleCheckpointClick = (j) => {
        setSelected(j);
    };

    const { image, name, details, price, prices, _type, colors } = product;

    let selectedPrice;
    console.log(colors)
    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }
    // console.log(qty); // Now it should log the value
    return (

        <Layout> {/* Wrap your page content with the Layout component */}


            <div>
                <div className="product-detail-container">
                    <div>
                        <div className="image-container">
                            {!imageOfIndex && <img src={urlFor(image && image[index])} alt="product" className="product-detail-image" />}
                            {imageOfIndex&&<img src={urlFor(colors[indexColors].image && colors[indexColors].image)} alt="product" className="product-detail-image" />}
                        </div>
                        <div className="small-images-container">
                            {
                                colors?.map((item, i) => (
                                    <img
                                        alt="item"
                                        key={i}
                                        src={urlFor(item.image)}
                                        className={i === indexColors ? 'small-image selected-image' : 'small-image'}
                                        onMouseEnter={() => {
                                            setIndexColors(i)
                                            setImageOfIndex(true)
                                        }} />
                                ))
                            }
                        </div>
                        <div className="small-images-container">
                            {
                                image?.map((item, i) => (
                                    <img
                                        alt="item"
                                        key={i}
                                        src={urlFor(item)}
                                        className={i === index ? 'small-image selected-image' : 'small-image'}
                                        onMouseEnter={() => {setIndex(i)
                                            setImageOfIndex(false)}} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="product-detail-desc">
                        <h1>
                            {name}
                        </h1>
                        <div className="reviews">
                            <div>
                                <AiFillStar style={{ color: 'gold' }} />
                                <AiFillStar style={{ color: 'gold' }} />
                                <AiFillStar style={{ color: 'gold' }} />
                                <AiFillStar style={{ color: 'gold' }} />
                                <AiOutlineStar style={{ color: 'gold' }} />


                            </div>
                            <p>
                                (20)
                            </p>

                        </div>
                        <h4>
                            Details:
                        </h4>
                        <p>
                            {details}
                        </p>
                        <p className="price">
                            $   {!selectedSizePrice&&prices && Array.isArray(prices) && prices.length > 0 ? prices[0].price :selectedSizePrice}
                        </p>
                        <div>
                            {/* Your other JSX code... */}
                            {_type === 'mattress' ? (
                                <div>
                                    <label>Select Size:</label>
                                    <select id='mySelect' value={selectedSize ? selectedSize : ""} onChange={(e) => {
                                        const newSize = e.target.value;
                                        console.log(e.target.value)
                                        setSelectedSize(newSize);
                                        console.log(selectedSize)
                                   
                                        selectedPrice = prices.find(price => price.size === e.target.value)?.price;
                                        console.log(selectedPrice)
                                        setSelectedSizePrice(selectedPrice)
                                        console.log(product)
                                        product['price'] = selectedPrice
                                        if (_type === 'mattress' && newSize) {
                                            const selectedPricee = prices.find(price => price.size === newSize)?.price;
                                            if (selectedPricee) {
                                                const totalPrice = selectedPricee * (qty);
                                                setTotalPrice(totalPrice);
                                            }
                                        }

                                    }}
                                    >
                                        {prices.map((price, index) => (

                                            <option key={price._key} value={price.size}>
                                                {price.size}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedSize && (
                                        <h4>
                                            {/* ${prices.find((price) => price.size === selectedSize)?.price} */}
                                        </h4>
                                    )}
                                </div>
                            ) : (
                                <h4>
                                    ${price}
                                </h4>
                            )}
                            {/* Your other JSX code... */}
                        </div>

                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} className="quantity-desc">
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="minus" onClick={decQty}>
                                    <AiOutlineMinus style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} />
                                </span>
                                <span style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} className="num">
                                    {qty}
                                </span>

                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="plus" onClick={incQty}>
                                    <AiOutlinePlus style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} />
                                </span>


                            </p>
                        </div>



                        <div className="buttons">
                            <button className="add-to-cart" onClick={() => onAdd(product, qty, selectedSize, selectedSizePrice, image, name, details, prices, _type)} type="button">
                                Add to cart
                            </button>
                            <button className="buy-now" onClick={handleBuyNow} type="button">
                                Buy now
                            </button>
                        </div>

                    </div>

                </div>
                {/* <ComfortIndicator/> */}
                <div className="maylike-products-wrapper">
                    <h2>You may also like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {products.map((item) => (
                                <Product key={item._id} product={item} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </Layout>

    )
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type in ["product", "mattress"] && slug.current == '${slug}'][0]`;

    const product = await client.fetch(query)
    const productsQuery = `*[_type in ["${product._type}"]]`
    const products = await client.fetch(productsQuery)
    return {
        props: { products, product }
    }
}




export const getStaticPaths = async () => {
    const products = await client.fetch(`*[_type in ["product", "mattress"]]{
        
        slug{
            current
        }

    }
   `)
    const paths = products.map((product) => ({
        params: { slug: product.slug.current },
    }));
    return { paths, fallback: false }; // fallback: false means other routes should 404
};

export default ProductDetails;

