import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "context";
import starsShoot from "lib/utils";

const Success = () => {
  const { setProductsCart, setTotalPrice, setTotalQty } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setProductsCart([]);
    setTotalPrice(0);
    setTotalQty(0);
    starsShoot();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your email for the receipt</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:oder@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" width="300px" type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
