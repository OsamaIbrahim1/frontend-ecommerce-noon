import axios from "axios";
import React, { createContext } from "react";

export let categoryContext = createContext();

export default function CategoryContext(props) {
  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getCategoryById(categoryId) {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/category/getCategoryById/${categoryId}`,
      {
        headers,
      }
    );
  }

  return (
    <categoryContext.Provider value={{ getCategoryById }}>
      {props.children}
    </categoryContext.Provider>
  );
}
