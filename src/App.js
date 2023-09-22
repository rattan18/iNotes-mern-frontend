import Navbar from './component/Navbar'
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import React, { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  }

  
  return (
    <>

      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className='container my-3'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/About" element={<About showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;
