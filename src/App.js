import "./App.scss"
import Nav from "./component/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./component/Login/Login";
function App() {
  return (
    <Router>
      <div className="app-container">
        < Nav />
        <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/news" element={"news"} />
          <Route path="/contact" element={"contact"} />
          <Route path="/about" element={"about"} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={"404 Not Found"} />
        </Routes>
      </div>
    </Router >
  );
}
export default App;
