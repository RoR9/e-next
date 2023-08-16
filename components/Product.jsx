import { urlFor } from "lib/client";
import Link from "next/link";
import React from "react";

const Product = ({ product: { name, img, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            width={250}
            height={250}
            src={urlFor(img && img[0])}
            alt={name}
          />
          <p className={"product-name"}>{name}</p>
          <p className={"product-price"}>$ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
