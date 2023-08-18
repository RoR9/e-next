import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
// let item;

export default function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const totalPrice = productsCart.reduce(
    (acc, el) => acc + el.quantity * el.price,
    0
  );
  const totalQty = productsCart.reduce((acc, el) => acc + el.quantity, 0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const item = localStorage.getItem("cart");
    if (item) {
      setProductsCart(JSON.parse(item));
    }
  }, []);

  useEffect(() => {
    if (productsCart.length) {
      localStorage.setItem("cart", JSON.stringify(productsCart));
    }
  }, [productsCart]);

  useEffect(() => {
    if (!totalQty) {
      localStorage.removeItem("cart");
    }
  }, [totalQty]);

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
  };

  const addToCart = (product, quantity) => {
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

        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
