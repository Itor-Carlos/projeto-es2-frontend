import React from "react";
import { SideBar } from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListarArea } from "./pages/area/ListarArea";
import { CadastrarEditarArea } from "./pages/area/CadastrarEditarArea";
import './index.css'

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <SideBar/>
      <div className="main-content">
          <div>
              <Routes>
                <Route path="/area/cadastrar_area/" element={<CadastrarEditarArea/>}/>
                <Route path="/area/editar/:id" element={<CadastrarEditarArea />} />
                <Route path="/area/listar_area" element={<ListarArea/>}/>
              </Routes>
          </div>
      </div>
    </div>
   </BrowserRouter>
  );
}

export default App;
