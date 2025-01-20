import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login ({
  setIsAuth
}) {

  const [account, setAccount] = useState({
    "username": "",
    "password": ""
  });
  const [token, setToken] = useState();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if(token){
      axios.defaults.headers.common['Authorization'] = token;
      CheckUserLogin();
    }
  }, []);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { expired, token } = res.data;
      setToken(token);
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common['Authorization'] = token;
      CheckUserLogin();
    } catch (error) {
      alert('登入失敗');
    }
  };

  const CheckUserLogin = async (e) => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      setIsAuth(true);
    } catch (error) {
      alert('登入驗證失敗');
    }
  };

  return(
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input 
            name="username"
            value={account.username}
            onChange={handleLoginInputChange}
            type="email" className="form-control" id="username" placeholder="name@example.com" />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input 
            name="password"
            value={account.password}
            onChange={handleLoginInputChange}
            type="password" className="form-control" id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  )
}
export default Login;