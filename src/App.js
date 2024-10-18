import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "./Context/CartContext";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import About from "./Components/About/About";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Brand from "./Components/Brand/Brand";
import ProductContextProvider from "./Context/ProductContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import OrderContextProvider from "./Context/OrderContext";
import Order from "./Components/Order/Order";
import { Offline } from "react-detect-offline";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  let [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);

    setUserData(decodedToken);
  }

  let routers = createHashRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              {" "}
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brand />
            </ProtectedRoute>
          ),
        },
        {
          path: "Orders",
          element: (
            <ProtectedRoute>
              {" "}
              <Order />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              {" "}
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              {" "}
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "getProductById/:productId",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <OrderContextProvider>
        <ProductContextProvider>
          <Toaster />
          <Offline>
            <div className="network">Only shown offline (surprise!)</div>
          </Offline>
          <RouterProvider router={routers}></RouterProvider>
        </ProductContextProvider>
      </OrderContextProvider>
    </CartContextProvider>
  );
}

export default App;
