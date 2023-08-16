/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Product } from "@components/index";
import { client, urlFor } from "lib/client";
import React from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "context";

const ProductDetail = ({ product, productList }) => {
  const [index, setIndex] = useState(0);
  const { img, name, price, description, _id } = product;
  const { qty, decrementQty, incrementQty, addToCart, setShowCart, setQty } =
    useStateContext();

  useEffect(() => {
    setIndex(0);
    setQty(1);
  }, [_id]);

  const handleBuyNow = () => {
    console.log(product, qty);
    addToCart(product, qty);
    setShowCart(true);
  };

  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(img && img[index])}
              alt=""
            />
          </div>
          <div className="small-images-container">
            {img?.map((item, i) => (
              <img
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                key={i}
                src={urlFor(item)}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>{"(20)"}</p>
          </div>
          <h4>Details:</h4>
          <p>{description}</p>
          <p className="price">$ {price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decrementQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incrementQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You May Also Like</h2>
        <div className="marquee">
          <div className="marquee__content">
            {productList.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="marquee__content">
            {productList.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] `;
  const queryList = `*[_type == "product" && slug.current != "${slug}"]`;

  const product = await client.fetch(query);
  const productList = await client.fetch(queryList);

  return {
    props: { product, productList },
  };
};

export default ProductDetail;
