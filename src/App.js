import "./App.scss"
import Nav from "./component/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./component/Login/Login";
import Home from "./component/Home /Home";
import Register from "./component/Register/Register";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="app-container" style={{ height: "100vh", backgroundColor: "#ccc" }}>
        {/* < Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={"news"} />
          <Route path="/contact" element={"contact"} />
          <Route path="/about" element={"about"} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
