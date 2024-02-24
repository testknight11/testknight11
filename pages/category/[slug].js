"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../lib/client'
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import Product from '../../src/app/components/Product';
import { useRouter } from 'next/router';


const CategoryProducts = ({ categoryProducts }) => {
    const [products, setProducts] = useState([]);
    const [datasetUpdated, setDatasetUpdated] = useState(false);
    const [sseConnection, setSSEConnection] = useState(null);
    useEffect(() => {

        setProducts(categoryProducts)
    }, [])

    // Inside your functional component
    const router = useRouter();
    const { slug } = router.query;

    const listenToSSEUpdates = useCallback(() => {


        const eventSource = new EventSource('/api/handler/');
        console.log(eventSource)

        setSSEConnection(eventSource)

        eventSource.onmessage = (event) => {
            console.log(slug)
            console.log(event.data)
            // Handle the received message here
            // Assuming event.data is your object and products and setProducts are your state variable and setter function respectively
            let update = JSON.parse(event.data)
            // Check if the slug is equal to the _type
            if (update) {
                if (slug === update._type) {

                    // Find the index of the product in the products array with id equal to _id
                    const index = products.findIndex(product => product._id === update._id);

                    // Check if a matching product was found
                    if (index !== -1) {
                        // If found, check if updatedAt differs
                        if (products[index]._updatedAt === update._updatedAt) {
                            // If they differ, delete the existing product
                            const updatedProducts = [...products]; // Create a copy of the products array
                            updatedProducts.splice(index, 1); // Remove the existing product at the found index
                            setProducts(updatedProducts); // Update the state with the modified array
                            console.log("Deleted existing product with same updatedAt:", products[index]);
                        } else {
                            console.log("Product with same updatedAt already exists, deleting existing product.");
                            const updatedProducts = [...products]; // Create a copy of the products array
                            updatedProducts[index] = update // Remove the existing product at the found index
                            setProducts(updatedProducts); // Update the state with the modified array
                        }
                    }

                    // Add the new product into the array
                    else if (index === -1) {


                        setProducts(prevProducts => [...prevProducts, update]); // Add the new product to the array
                        console.log("Added product:", update);

                    }

                } else {
                    console.log("Slug is not equal to _type");
                }
            }






        };

        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            // Handle the SSE connection error here
        };

        eventSource.onopen = () => {
            console.log('SSE connection established.', eventSource);
            // Optional: Perform actions when the SSE connection is established
        };

        eventSource.onclose = () => {
            console.log('SSE connection closed.');
            // Optional: Perform actions when the SSE connection is closed
        };

        // Clean up the EventSource when the component unmounts
        return () => {
            eventSource.close();
        };






    }, []);









    useEffect(() => {

        // fetchProductsByCategory(slug)

        listenToSSEUpdates();

        return () => {

            if (sseConnection) {

                sseConnection.close();

            }

        };

    }, [listenToSSEUpdates]);




    useEffect(() => {

        const handleBeforeUnload = () => {

            console.dir(sseConnection);

            if (sseConnection) {

                console.info('Closing SSE connection before unloading the page.');

                sseConnection.close();

            }

        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener when the component is unmounted

        return () => {

            window.removeEventListener('beforeunload', handleBeforeUnload);

        };

    }, [sseConnection]);

    const fetchProductsByCategory = async (categorySlug) => {
        try {
            const productsQuery = `*[_type == "${categorySlug}"]`;
            const products = await client.fetch(productsQuery);
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    // console.log(categoryProducts)
    return (
        <Layout>
            <div className="products-container">
                {products?.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </div>
        </Layout>
    )

}











export const getStaticProps = async ({ params: { slug } }) => {
    // console.log(slug)

    const productsQuery = `*[_type =="${slug}"]`
    const categoryProducts = await client.fetch(productsQuery)

    return {
        props: { categoryProducts },
        revalidate: true,
    }






}




export const getStaticPaths = async () => {

    const categories = await client.fetch(`*[_type == "category"]{
        
        slug{
            current
        }

    }
   `)

    const paths = categories?.map((category) => ({
        params: { slug: category?.slug?.current },
    }));
    return { paths, fallback: false }; // fallback: false means other routes should 404
};
export default CategoryProducts