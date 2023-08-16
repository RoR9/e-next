import { createContext, useState, useEffect, useContext, useRef } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
// let item;

export default function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  // if (typeof window !== "undefined") {
  //   console.log("get");
  //   // Perform localStorage action
  //   item = localStorage.getItem("cart");
  // }
  // useEffect(() => {
  //   console.log("parse");
  //   setProductsCart(JSON.parse(item) || []);
  // }, []);

  // console.log(productsCart);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(productsCart));
  // }, [productsCart]);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showCart]);

  const handleRemove = (product) => {
    const filteredProducts = productsCart.filter(
      (el) => el._id !== product._id
    );
    setProductsCart(filteredProducts);
    setTotalPrice(
      filteredProducts.reduce((acc, el) => acc + el.quantity * el.price, 0)
    );
    setTotalQty(filteredProducts.reduce((acc, el) => acc + el.quantity, 0));
  };

  const addToCart = (product, quantity) => {
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);
    const findElement = productsCart.find((item) => item._id === product._id);
    findElement;
    if (findElement) {
      const arr = productsCart.map((item) => {
        if (item._id === product._id) {
          return {
            ...product,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
      setProductsCart([...arr]);
    } else {
      setProductsCart((prevState) => [...prevState, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const toggleCartQty = (product, value) => {
    let updatedProducts;
    if (value === "increment") {
      updatedProducts = productsCart.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setProductsCart(updatedProducts);
    } else if (value === "decrement") {
      updatedProducts = productsCart.map((item) => {
        if (item._id === product._id && product.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      setProductsCart(updatedProducts);
    }
    const total = updatedProducts.reduce(
      (acc, el) => acc + el.quantity * el.price,
      0
    );

    setTotalPrice(total);
    setTotalQty(updatedProducts.reduce((acc, el) => acc + el.quantity, 0));
  };

  const incrementQty = () => setQty((prevQty) => prevQty + 1);
  const decrementQty = () => {
    if (qty === 1) return;
    setQty((prevQty) => prevQty - 1);
  };

  return (
    <Context.Provider
      value={{
        qty,
        showCart,
        totalQty,
        totalPrice,
        productsCart,
        incrementQty,
        decrementQty,
        addToCart,
        setShowCart,
        toggleCartQty,
        handleRemove,
        setProductsCart,
        setTotalPrice,
        setTotalQty,
        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
