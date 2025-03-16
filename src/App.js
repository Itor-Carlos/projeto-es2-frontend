import React from "react";
import { SideBar } from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListarArea } from "./pages/area/ListarArea";
import { CadastrarEditarArea } from "./pages/area/CadastrarEditarArea";
import './index.css'
import { CadastrarClientes } from "./pages/cliente/CadastrarClientes";

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
                <Route path="/cliente/cadastrar_cliente" element={<CadastrarClientes/>}/>
              </Routes>
          </div>
      </div>
    </div>
   </BrowserRouter>
  );
}

export default App;
