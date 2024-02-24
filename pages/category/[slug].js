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

    const listenToSSEUpdates=useCallback(() => {


        const eventSource = new EventSource('/api/handler/');
        console.log(eventSource)

        setSSEConnection(eventSource)

        eventSource.onmessage = (event) => {
console.log(slug)
            console.log(event.data)
            // Handle the received message here
            if (slug === JSON.parse(event.data)._type) {
                // Find the index of the product in the products array with id equal to _id
                const index = products.findIndex(product => product.id === event.data._id);
            
                // Check if a matching product was found
                if (index !== -1) {
                    // If found, remove the product from the array
                    const updatedProducts = [...products]; // Create a copy of the products array
                    updatedProducts.splice(index, 1); // Remove the product at the found index
                    setProducts(updatedProducts); // Update the state with the modified array
                    console.log("Removed product:", products[index]);
                } else {
                    // If not found, push the product into the array
                    setProducts(prevProducts => [...prevProducts, event.data]); // Add the new product to the array
                    console.log("Added product:", event.data);
                }
            } else {
                console.log("Slug is not equal to _type");
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
        props: { categoryProducts }
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