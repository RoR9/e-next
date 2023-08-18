import { useEffect, useRef } from "react";
import { useStateContext } from "context";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Link from "next/link";
import { urlFor } from "lib/client";
import getStripe from "lib/getStripe";
import { toast } from "react-hot-toast";

const Cart = () => {
  const cartElement = useRef(null);

  const {
    totalQty,
    productsCart,
    setShowCart,
    totalPrice,
    toggleCartQty,
    handleRemove,
  } = useStateContext();

  const handleHideCart = (e) => {
    if (e.target.className == "cart-wrapper") {
      e.stopPropagation();
      setShowCart(false);
    }
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsCart),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    console.log(data);

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" onClick={handleHideCart}>
      <div className="cart-container">
        <div className="cart-heading">
          <button className="cart-close" onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
          </button>
          <p className="heading">Your cart:</p>
          <p className="cart-num-items">{totalQty} items</p>
        </div>

        {totalQty < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {totalQty >= 1 &&
            productsCart.map((product) => {
              return (
                <div className="product" key={product._id}>
                  <img
                    src={urlFor(product.img[0])}
                    alt=""
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex flex-top">
                      <h5>{product.name}</h5>
                      <h4>${product.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartQty(product, "decrement")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick={() => {}}>
                          {product.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => toggleCartQty(product, "increment")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => handleRemove(product)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {totalQty >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" onClick={handleCheckout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
