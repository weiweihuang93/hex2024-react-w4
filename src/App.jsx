import { useState } from "react";
import Login from "./Pages/Login";
import Products from "./pages/Products";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  return(
  <>
  {isAuth ? 
  (
    <Products isAuth={isAuth}/>
  ) : 
  (
    <Login
      setIsAuth={setIsAuth} />
)}
  </>
  )
};
export default App