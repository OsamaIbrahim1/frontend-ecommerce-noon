import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  const [numberOfCartItem, setnumberOfCartItem] = useState(0);

  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.success) {
      setnumberOfCartItem(response.data.data.products.length);
    }
  }

  async function addToCart(productId, quantity) {
    return await axios.post(
      `https://e-cmmerce-noon-5.onrender.com/cart/addProductToCart`,
      {
        productId,
        quantity,
      },
      {
        headers,
      }
    );
  }

  async function getLoggedUserCart() {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/cart/getCartData`,
      {
        headers,
      }
    );
  }

  useEffect(() => {
    getCart();
  }, []);

  async function removeItem(productId) {
    return await axios.delete(
      `https://e-cmmerce-noon-5.onrender.com/cart/removeFromCart/${productId}`,
      {
        headers,
      }
    );
  }

  async function clearCart(cartId) {
    return await axios.delete(
      `https://e-cmmerce-noon-5.onrender.com/cart/clearCart/${cartId}`,
      { headers }
    );
  }

  return (
    <cartContext.Provider
      value={{
        setnumberOfCartItem,
        numberOfCartItem,
        addToCart,
        getLoggedUserCart,
        removeItem,
        clearCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
