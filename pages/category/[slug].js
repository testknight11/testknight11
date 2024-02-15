import React from 'react'
import { client } from '../../lib/client'
import Layout from '../../src/app/components/Layout'; // Import the Layout component
import Product from '../../src/app/components/Product';

const CategoryProducts = ({ categoryProducts }) => {
    console.log(categoryProducts)
    return (
        <Layout>
            <div className="products-container">
                {categoryProducts?.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </div>
        </Layout>
    )

}











export const getStaticProps = async ({ params: { slug } }) => {
    console.log(slug)
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