import axios from "axios";
import React, { createContext } from "react";

export let productContext = createContext();

export default function ProductContextProvider(props) {
  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getProductsForBrand(brandId) {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/product/productsForSpecificBrand/${brandId}`,
      {
        headers,
      }
    );
  }

  return (
    <productContext.Provider value={{ getProductsForBrand }}>
      {props.children}
    </productContext.Provider>
  );
}
