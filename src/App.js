import "./App.scss"
import Nav from "./component/Navigation/Nav";
import AppRoutes from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className="app-header">
        <Nav />
      </div>

      <div className="app-container" style={{ height: "100vh", backgroundColor: "#ccc" }}>
        <AppRoutes />
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
    </Router >
  );
}
export default App;
