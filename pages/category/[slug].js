"use client"
import React ,{useState,useEffect} from 'react'
import { client } from '../../lib/client'
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import Product from '../../src/app/components/Product';
import { useRouter } from 'next/router';

const CategoryProducts = ({ categoryProducts }) => {

    const [products, setProducts] = useState([]);
    const [datasetUpdated, setDatasetUpdated] = useState(false);


    // Inside your functional component
    const router = useRouter();
    const { slug } = router.query;
    console.log(slug)
    useEffect(() => {
        setProducts(categoryProducts)
        // Establish WebSocket connection
        const ws = new WebSocket(`wss://ecommerce-r126.vercel.app/api/websocket`); // Update with your WebSocket server URL

        // WebSocket event listeners
        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = async (event) => {
            console.log('WebSocket message received:', event.data);

            // When a WebSocket message is received, check if it's 'Dataset updated'
            if (event.data === 'Dataset updated') {
                // Fetch updated product and products data
                // const updatedProduct = await client.fetch(query);
                const updatedProductsQuery = `*[_type in ["${updatedProduct._type}"]]`;
                const updatedProducts = await client.fetch(updatedProductsQuery);
                setProducts(updatedProducts)
                // Update state with the new data

            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Clean up WebSocket connection
        return () => {
            ws.close();
        };
    }, []); // Emp









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