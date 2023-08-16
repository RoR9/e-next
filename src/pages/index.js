import React from "react";
import { HeroBanner, FooterBanner, Product } from "@components/index";
import { client } from "lib/client";

const index = ({ products, banner }) => {
  return (
    <>
      <HeroBanner heroBanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Headphones</h2>
        <p>Good Quality</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banner.length && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const bannerQuery = `*[_type== "banner"]`;
  const banner = await client.fetch(bannerQuery);

  return {
    props: {
      products: products,
      banner: banner,
    },
  };
};

export default index;
