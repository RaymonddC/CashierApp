import logo from './logo.svg';
import './App.css';
import Toaster from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      {/* <Toaster /> */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
