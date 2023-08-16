import Link from "next/link";
import React from "react";
import { urlFor } from "lib/client";
import Image from "next/image";

const HeroBanner = ({ heroBanner }) => {
  {
    heroBanner.product;
  }
  return (
    <>
      <div className="hero-banner-container">
        <div>
          <p className="beats-solo">{heroBanner.smallText}</p>
          <h3>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <Image
            alt="img"
            className="hero-banner-image"
            src={urlFor(heroBanner.image).url()}
            width={450}
            height={450}
          />
          <div>
            <Link href={`/product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
            <div className="desc">
              <h5>Description</h5>
              <p>{heroBanner.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
