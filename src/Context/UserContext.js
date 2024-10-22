import axios from "axios";
import React, { createContext } from "react";

export let userContext = createContext();

export default function UserContext(props) {
  let headers = {
    accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
  };

  async function getUserData() {
    return await axios.get(
      `https://e-cmmerce-noon-5.onrender.com/auth/getUserData`,
      {
        headers,
      }
    );
  }

  async function deleteAccount() {
    return await axios.delete(
      `https://e-cmmerce-noon-5.onrender.com/auth/delete`,
      {
        headers,
      }
    );
  }

  async function handleUpdateAccount(values) {
    let { data } = await axios
      .post("https://e-cmmerce-noon-5.onrender.com/auth/update", values, {
        headers,
      })
      
  }

  return (
    <userContext.Provider value={{ getUserData, deleteAccount }}>
      {props.children}
    </userContext.Provider>
  );
}
