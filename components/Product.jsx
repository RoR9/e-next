import Link from "next/link";
import React from "react";
import { ImageComponent } from "./ImageComponent";

const Product = ({ product: { name, img, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <ImageComponent
            className="product-image"
            width={250}
            height={250}
            alt={name}
            image={img[0]}
          />
          <p className={"product-name"}>{name}</p>
          <p className={"product-price"}>$ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
