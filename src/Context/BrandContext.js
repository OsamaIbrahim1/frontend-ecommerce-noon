import axios from "axios";
import React, { createContext } from "react";

export let brandContext = createContext();

export default function BrandContextProvider(props) {
  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getBrandsForCategory(categoryId) {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/category/getAllBrandForCategory/${categoryId}`,
      {
        headers,
      }
    );
  }

  async function getBrandDetails(brandId) {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/brand/getBrandById/${brandId}`,
      {
        headers,
      }
    );
  }

  return (
    <brandContext.Provider value={{ getBrandsForCategory, getBrandDetails }}>
      {props.children}
    </brandContext.Provider>
  );
}
