"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../lib/client'
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import Product from '../../src/app/components/Product';
import { useRouter } from 'next/router';

const CategoryProducts = ({ categoryProducts }) => {

    const [products, setProducts] = useState([]);
    const [datasetUpdated, setDatasetUpdated] = useState(false);
    const [sseConnection, setSSEConnection] = useState(null); useEffect(() => {

        setProducts(categoryProducts)
    }, [])

    // Inside your functional component
    const router = useRouter();
    const { slug } = router.query;
    console.log(slug)
    const listenToSSEUpdates = useCallback(() => {

        console.log('listenToSSEUpdates func');



        const eventSource = new EventSource('/api/websocket');
        console.log(eventSource)
        if (eventSource.readyState === 1) {
            eventSource.onopen = () => {

                console.log('SSE connection opened.');

                // Save the SSE connection reference in the state

            };

            eventSource.onmessage = (event) => {

                const data = event.data;

                console.log('Received SSE Update:', data);
                if (data._type === slug) {
                    fetchProductsByCategory(slug)
                }



                // Update your UI or do other processing with the received data

            };

            eventSource.onerror = (event) => {

                console.error('SSE Error:', event);

                // Handle the SSE error here

            };

            setSSEConnection(eventSource);

            return eventSource;
        }
    }, []);

    useEffect(() => {

        fetchProductsByCategory(slug)

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