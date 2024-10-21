// import axios from "axios";
// import { createContext } from "react";

// export const brandContext = createContext();

// export function BrandContextProvider(props) {
//   let headers = {
//     accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
//   };

//   async function getBrandsForCategory(categoryId) {
//     console.log("categoryId:", categoryId);
//     return await axios.get(
//       `https://e-cmmerce-noon-5.onrender.com/category/getAllBrandForCategory/${categoryId}`,
//       {
//         headers,
//       }
//     );
//   }

//   return (
//     <brandContext.Provider value={{ getBrandsForCategory }}>
//       {props.children}
//     </brandContext.Provider>
//   );
// }

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
