"use client";
import React, { useState, useEffect, useRef } from 'react'
import { useStateContext } from '../../context/StateContext';
// import {Toaster} from 'react-hot-toast';
import { client, urlFor } from '../../lib/client'
// import "../../src/app/globals.css";
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import { AiOutlineMinus, AiOutlineplus, AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import Product from '../../src/app/components/Product';
// import ComfortIndicator from '../../src/app/components/ComfortIndicator';

const ProductDetails = ({ product, products }) => {

    // if (!product) {
    //     return <div>Product not found</div>;
    // }
    const [imageOfColor, setImageOfColor] = useState({});

    const [imageOfIndex, setImageOfIndex] = useState(false);
    const [index, setIndex] = useState(0);
    const [indexColors, setIndexColors] = useState(0);
    const [selected, setSelected] = useState(2); // Medium by default
    const [selectedSizePrice, setSelectedSizePrice] = useState(0); // Medium by deselectmycolorfault
    const [enlargedImage, setEnlargedImage] = useState(null);
    const { selectedColor, setSelectedColor, onAdd, decQty, incQty, qty, setShowCart, selectedSize, setSelectedSize, setSelectedSizes, setTotalPrice, selectedSizes } = useStateContext();
    useEffect(() => {

        
    
        // Dynamically import Hammer.js only on the client-side
        import('hammerjs').then((Hammer) => {
            // Check if window is defined (client-side)
            if (typeof window !== 'undefined') {
                // Your Hammer.js initialization code
                const mc = new Hammer(swipeContainer);
                // Add event listeners, configure gestures, etc.
                
        const swipeContainer = document.querySelector('.swipe-container');
  
    
        mc.on('swipeleft', function () {
            // Handle swipe left (go to next item)
            // You can implement logic to navigate to the next item here
            document.querySelector('.swipe-left').click()
        });
    
        mc.on('swiperight', function () {
            // Handle swipe right (go to previous item)
            // You can implement logic to navigate to the previous item here
            document.querySelector('.swipe-right').click()
    
        });
            }
        }).catch((error) => {
            console.error('Error loading Hammer.js:', error);
        });




    
    }, []); //



    useEffect(() => {






        const selectElement = document.getElementById('mySelect');

        const selectColor = document.getElementById('colorMySelect');

        setSelectedSize(selectElement?.options[0]?.value)
        setSelectedColor(selectColor?.options[0]?.value)



        if (colors) {
            const colorImage = colors?.find(item => item.name === selectColor?.options[0]?.value)?.image; // Using optional chaining for safety
            setImageOfColor(colorImage);
        }
        else {
            setImageOfColor(image[0]);
        }




        if (prices) {
            setSelectedSizePrice(prices[0].price)

            product['price'] = prices[0].price


        }


    }, [product])

    const handleSlide = (direction) => {
        if (direction === 'next') {
            if (imageOfIndex && index < colors.length - 1) {
                setIndexColors(index + 1);
                setEnlargedImage(urlFor(colors[indexColors + 1].image));
            } else if (!imageOfIndex && index < image.length - 1) {
                setIndex(index + 1);
                setEnlargedImage(urlFor(image[index + 1]));
            }
        } else if (direction === 'prev') {
            if (imageOfIndex && index > 0) {
                setIndexColors(index - 1);
                setEnlargedImage(urlFor(colors[index - 1].image));
            } else if (!imageOfIndex && index > 0) {
                setIndex(index - 1);
                setEnlargedImage(urlFor(image[index - 1]));
            }
        }
    };



  









    const handleImageClick = (url) => {
        setEnlargedImage(url);
        if (document.querySelector('.product-detail-container .image-container')) {
            document.querySelector('.product-detail-container .image-container').style.display = "none"
        }
    };

    const handleCloseClick = () => {
        setEnlargedImage(null);
        document.querySelector('.product-detail-container .image-container').style.display = "block"
    };

    const { image, name, details, price, prices, _type, colors, _id } = product;






    let selectedPrice;

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
                        {enlargedImage && (
                            <div className="enlarged-image-container">

                                <img
                                    src={enlargedImage}
                                    alt="enlarged-product"
                                    className="swipe-container enlarged-product-detail-image"
                                />

                                <button style={{ display: 'none' }} className="swipe-right" onClick={() => handleSlide('prev')}>Previous</button>
                                <button style={{ display: 'none' }} className="swipe-left" onClick={() => handleSlide('next')}>Next</button>
                                <button onClick={handleCloseClick}>Close</button>
                            </div>
                        )}
                        <div className="image-container">
                            {!imageOfIndex && <img onClick={() => handleImageClick(urlFor(image && image[index]))}
                                src={urlFor(image && image[index])}
                                alt="product"
                                className="product-detail-image" />}
                            {imageOfIndex && <img src={urlFor(colors[indexColors].image && colors[indexColors].image)} alt="product" className="product-detail-image" />}
                        </div>
                        <div className="small-images-container">
                            {
                                colors?.map((item, i) => (
                                    <img
                                        alt={item.name}
                                        key={i}
                                        src={urlFor(item.image)}
                                        className={i === indexColors ? 'small-image selected-image' : 'small-image'}
                                        onMouseEnter={() => {
                                            setIndexColors(i)
                                            setImageOfIndex(true)
                                        }}



                                    />
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
                                        onMouseEnter={() => {
                                            setIndex(i)
                                            setImageOfIndex(false)
                                        }} />
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

                            </p>

                        </div>
                        <h4>
                            Details:
                        </h4>
                        <p>
                            {details}
                        </p>
                        <p className="price">
                            {!selectedSizePrice && prices && Array.isArray(prices) && prices.length > 0 ? prices[0].price : selectedSizePrice ? '$ ' + selectedSizePrice : price !== undefined ? "$ " + price
                                : ''}
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
                                        // product['quantity']=qty
                                        // if (_type === 'mattress' && newSize) {
                                        //     const selectedPrice = prices.find(price => price.size === newSize)?.price;
                                        //     if (selectedPricee) {
                                        //         const totalPrice = selectedPrice * (qty);
                                        //         setTotalPrice(totalPrice);
                                        //     }
                                        // }

                                    }}
                                    >
                                        {prices?.map((price, index) => (

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
                                    {price !== undefined ? '$ ' + price : ""}
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

                        <div className="quantity">
                            <h3>Color:</h3>

                            <select id="colorMySelect" value={selectedColor ? selectedColor : ""} onChange={(e) => {
                                const newColor = e.target.value;
                                console.log(e.target.value)
                                setSelectedColor(newColor);
                                const colorImage = colors?.find(item => item.name === e.target.value)?.image; // Using optional chaining for safety
                                setImageOfColor(colorImage);
                                product['color'] = e.target.value
                            }
                            }>
                                {
                                    colors?.map((item, i) => (

                                        <option key={i} value={item.name}>{item.name}</option>



                                    ))
                                }




                            </select>

                        </div>



                        <div className="buttons">
                            <button className="add-to-cart" onClick={() => {
                                {

                                    let finalImage;
                                    if (colors) {
                                        finalImage = imageOfColor
                                    }
                                    else {
                                        finalImage = image[0]
                                    }
                                    console.log(finalImage)
                                    onAdd(product, qty, selectedSize, selectedSizePrice, finalImage, name, details, prices, _type, selectedColor)


                                }
                            }} type="button">
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
                            {products?.map((item) => (
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

    const query = `*[_type in ["product", "mattress", "chair", "bed", "bedroomset", "diningset", "jatifurniture", "multiplepurposes", "officetable", "sofa", "sofabed", "tvcabinet"] && slug.current == '${slug}'][0]`;

    const product = await client.fetch(query)
    const productsQuery = `*[_type in ["${product._type}"]]`
    const products = await client.fetch(productsQuery)
    return {
        props: { products, product }
    }
}




export const getStaticPaths = async () => {

    const products = await client.fetch(`*[_type in ["product", "mattress","chair", "bed", "bedroomset", "diningset", "jatifurniture", "multiplepurposes", "officetable", "sofa", "sofabed", "tvcabinet"]]{
        
        slug{
            current
        }

    }
   `)
    console.log(products)
    const paths = products?.map((product) => ({
        params: { slug: product?.slug?.current },
    }));
    return { paths, fallback: false }; // fallback: false means other routes should 404
};

export default ProductDetails;

