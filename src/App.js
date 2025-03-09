import React, { StrictMode } from "react";
import { SideBar } from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CadastrarArea } from "./pages/area/CadastrarArea";
import { ListarArea } from "./pages/area/ListarArea";
import './index.css'

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <SideBar/>
      <div className="main-content">
          <div>
              <Routes>
                <Route path="/area/cadastrar_area" element={<CadastrarArea/>}/>
                <Route path="/area/listar_area" element={<ListarArea/>}/>
              </Routes>
          </div>
      </div>
    </div>
   </BrowserRouter>
  );
}

export default App;
