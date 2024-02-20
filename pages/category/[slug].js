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
    console.log(slug)

    console.log('listenToSSEUpdates func');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/websocket');
                console.log(response)
                if (response._type === slug) {
                    fetchProductsByCategory(slug)
                }
            } catch (error) {
                console.error('SSE Error:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, []);

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