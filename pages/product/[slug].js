"use client";
import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext';
// import {Toaster} from 'react-hot-toast';
import { client, urlFor } from '../../lib/client'
// import "../../src/app/globals.css";
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import { AiOutlineMinus, AiOutlineplus, AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import Product from '../../src/app/components/Product';
import ComfortIndicator from '../../src/app/components/ComfortIndicator';

const ProductDetails = ({ product, products }) => {


    if (!product) {
        return <div>Product not found</div>;
    }
    const [index, setIndex] = useState(0);
    const { onAdd, decQty, incQty, qty, setShowCart } = useStateContext();
    const [selected, setSelected] = useState(2); // Medium by default

    const handleCheckpointClick = (j) => {
        setSelected(j);
    };

    const { image, name, details, price } = product;

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
                            <img src={urlFor(image && image[index])} alt="product" className="product-detail-image" />
                        </div>
                        <div className="small-images-container">
                            {
                                image?.map((item, i) => (
                                    <img
                                        alt="item"
                                        key={i}
                                        src={urlFor(item)}
                                        className={i === index ? 'small-image selected-image' : 'small-image'}
                                        onMouseEnter={() => setIndex(i)} />
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
                            ${price}
                        </p>
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
                            <button className="add-to-cart" onClick={() => onAdd(product, qty)} type="button">
                                Add to cart
                            </button>
                            <button className="buy-now" onClick={handleBuyNow} type="button">
                                Buy now
                            </button>
                        </div>

                    </div>
                </div>
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
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productsQuery = `*[_type == "product"]`
    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
    return {
        props: { products, product }
    }
}




export const getStaticPaths = async () => {
    const products = await client.fetch(`*[_type == "product" && _type == 'mattress']{
        
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

