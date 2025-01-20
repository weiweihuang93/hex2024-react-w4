import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Login from "./Pages/Login";
import Products from "./pages/Products";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  return(
  <>
  {isAuth ? 
  (<>
    <Products isAuth={isAuth}/>
  </>) : 
  (<>
    <Login
      setIsAuth={setIsAuth} />
  </>)}
  </>
  )
};
export default App