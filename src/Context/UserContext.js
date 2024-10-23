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
  async function changePassword(values) {
    return await axios.patch(
      `https://e-cmmerce-noon-5.onrender.com/auth/updatepassword`,
      values,
      {
        headers,
      }
    );
  }

 

  return (
    <userContext.Provider
      value={{ getUserData, deleteAccount, changePassword }}
    >
      {props.children}
    </userContext.Provider>
  );
}
