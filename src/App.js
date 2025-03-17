import React from "react";
import { SideBar } from "./components/SideBar";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { Router } from "./components/Router";

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <SideBar/>
      <Router/>
    </div>
   </BrowserRouter>
  );
}

export default App;
