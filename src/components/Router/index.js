import { ListarArea } from "../../pages/area/ListarArea";
import { CadastrarEditarArea } from "../../pages/area/CadastrarEditarArea";
import { CadastrarEditarClientes } from "../../pages/cliente/CadastrarEditarClientes";
import { CadastrarEditarGrao } from "../../pages/grao/CadastrarEditarGrao";
import { Route, Routes } from "react-router-dom";
import './styles.css';
import { CadastrarEditarSafra } from "../../pages/safra/CadastrarEditarSafra";
import { ListarSafra } from "../../pages/safra/ListarSafra";
import { ListarGrao } from "../../pages/grao/ListarGrao";
import { ListarClientes } from "../../pages/cliente/ListarClientes";
import { CadastrarEditarFertilizante } from "../../pages/fertilizante/CadastrarEditarFertilizante";
import { ListarFertilizante } from "../../pages/fertilizante/ListarFertilizante";
import { CadastrarTarefa } from "../../pages/tarefa/CadastrarTarefa";
import { AlocarTarefa } from "../../pages/tarefa/AlocarTarefa";

export const Router = () => {
    return (
        <div className="main-content">
            <div>
                <Routes>
                    <Route path="/area/cadastrar/" element={<CadastrarEditarArea/>}/>
                    <Route path="/area/editar/:id" element={<CadastrarEditarArea />} />
                    <Route path="/area/listar" element={<ListarArea/>}/>
                    <Route path="/cliente/cadastrar" element={<CadastrarEditarClientes/>}/>
                    <Route path="/cliente/editar/:id" element={<CadastrarEditarClientes/>}/>
                    <Route path="/cliente/listar" element={<ListarClientes/>}/>
                    <Route path="/grao/cadastrar" element={<CadastrarEditarGrao/>}/>
                    <Route path="/grao/listar" element={<ListarGrao/>}/>
                    <Route path="/grao/editar/:id" element={<CadastrarEditarGrao/>}/>
                    <Route path="/safra/cadastrar/" element={<CadastrarEditarSafra/>}/>
                    <Route path="/safra/listar" element={<ListarSafra/>}/>
                    <Route path="/safra/editar/:id" element={<CadastrarEditarSafra />} />
                    <Route path="/fertilizante/cadastrar/" element={<CadastrarEditarFertilizante />} />
                    <Route path="/fertilizante/editar/:id" element={<CadastrarEditarFertilizante />} />
                    <Route path="/fertilizante/listar" element={<ListarFertilizante />} />
                    <Route path="/tarefa/cadastrar" element={<CadastrarTarefa />} />
                    <Route path="/tarefa/alocar/" element={<AlocarTarefa />} />
                </Routes>
            </div>
        </div>
    )
}   