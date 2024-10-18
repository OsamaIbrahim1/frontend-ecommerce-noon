import axios from "axios";
import React, { createContext } from "react";

export let orderContext = createContext();

export default function OrderContextProvider(props) {
  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getOrderDetails(orderId) {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/order/getOrderById/${orderId}`,
      {
        headers,
      }
    );
  }

  async function convertCartToOrder(values) {
    return await axios.post(
      `https://e-cmmerce-noon-5.onrender.com/order/convertCartToOrder`,
      values,
      {
        headers,
      }
    );
  }

  async function getAllOrdersUser() {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/order/getAllOrders`,
      {
        headers,
      }
    );
  }

  async function onlinePayment(orderId) {
    return await axios.post(
      `https://e-cmmerce-noon-5.onrender.com/order/payWithStripe/${orderId}`,
      {},
      {
        headers,
      }
    );
  }

  return (
    <orderContext.Provider
      value={{
        convertCartToOrder,
        getOrderDetails,
        getAllOrdersUser,
        onlinePayment,
      }}
    >
      {props.children}
    </orderContext.Provider>
  );
}
