import { ListarArea } from "../../pages/area/ListarArea";
import { CadastrarEditarArea } from "../../pages/area/CadastrarEditarArea";
import { CadastrarClientes } from "../../pages/cliente/CadastrarClientes";
import { CadastrarEditarGrao } from "../../pages/grao/CadastrarEditarGrao";
import { Route, Routes } from "react-router-dom";
import './styles.css';

export const Router = () => {
    return (
        <div className="main-content">
            <div>
                <Routes>
                    <Route path="/area/cadastrar_area/" element={<CadastrarEditarArea/>}/>
                    <Route path="/area/editar/:id" element={<CadastrarEditarArea />} />
                    <Route path="/area/listar_area" element={<ListarArea/>}/>
                    <Route path="/cliente/cadastrar_cliente" element={<CadastrarClientes/>}/>
                    <Route path="/grao/cadastrar_grao/" element={<CadastrarEditarGrao/>}/>
                </Routes>
            </div>
        </div>
    )
}   