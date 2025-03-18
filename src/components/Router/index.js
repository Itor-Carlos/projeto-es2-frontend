import { ListarArea } from "../../pages/area/ListarArea";
import { CadastrarEditarArea } from "../../pages/area/CadastrarEditarArea";
import { CadastrarClientes } from "../../pages/cliente/CadastrarClientes";
import { CadastrarEditarGrao } from "../../pages/grao/CadastrarEditarGrao";
import { Route, Routes } from "react-router-dom";
import './styles.css';
import { CadastrarEditarSafra } from "../../pages/safra/CadastrarEditarSafra";
import { ListarSafra } from "../../pages/safra/ListarSafra";
import { ListarGrao } from "../../pages/grao/ListarGrao";

export const Router = () => {
    return (
        <div className="main-content">
            <div>
                <Routes>
                    <Route path="/area/cadastrar/" element={<CadastrarEditarArea/>}/>
                    <Route path="/area/editar/:id" element={<CadastrarEditarArea />} />
                    <Route path="/area/listar" element={<ListarArea/>}/>
                    <Route path="/cliente/cadastrar" element={<CadastrarClientes/>}/>
                    <Route path="/grao/cadastrar" element={<CadastrarEditarGrao/>}/>
                    <Route path="/grao/listar" element={<ListarGrao/>}/>
                    <Route path="/grao/editar/:id" element={<CadastrarEditarGrao/>}/>
                    <Route path="/safra/cadastrar/" element={<CadastrarEditarSafra/>}/>
                    <Route path="/safra/listar" element={<ListarSafra/>}/>
                    <Route path="/safra/editar/:id" element={<CadastrarEditarSafra />} />
                </Routes>
            </div>
        </div>
    )
}   