import "./App.scss"
import Nav from "./component/Navigation/Nav";
import Login from "./component/Login/Login";
import Home from "./component/Home /Home";
import Register from "./component/Register/Register";
import Users from "./component/Users/Users";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import _ from "lodash";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let checkLogin = sessionStorage.getItem('account');
    if (checkLogin) {
      setAccount(JSON.parse(checkLogin))
    }
  }, [account])
  return (
    <Router>
      <div className="app-container" style={{ height: "100vh", backgroundColor: "#ccc" }}>
        {account && !_.isEmpty(account) && account.isAuthenticate && <Nav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={"news"} />
          <Route path="/contact" element={"contact"} />
          <Route path="/about" element={"about"} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={"404 Not Found"} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router >
  );
}
export default App;
