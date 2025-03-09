import React, { StrictMode } from "react";
import { SideBar } from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {GenericForm} from "./components/Form";
import { CadastrarArea } from "./pages/area/CadastrarArea";

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <SideBar/>
      <div className="main-content">
        <Routes>
          <Route path="/area/cadastrar_area" element={<CadastrarArea/>}/>
        </Routes>
      </div>
    </div>
   </BrowserRouter>
  );
}

export default App;
