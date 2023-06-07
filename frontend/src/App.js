import logo from "./logo.svg";
import "./App.css";
import Toaster from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { Login } from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";

function App() {
  return (
    <div className="App">
      {/* <Toaster /> */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
