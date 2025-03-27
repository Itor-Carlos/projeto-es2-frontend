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
import { CadastrarCargo } from "../../pages/cargo/CadastrarCargo";
import { AlocarCargo } from "../../pages/cargo/AlocarCargo";
import { CadastrarTarefa } from "../../pages/tarefa/CadastrarTarefa";
import { AlocarTarefa } from "../../pages/tarefa/AlocarTarefa";
import { CadastrarEditarFornecedor } from "../../pages/fornecedor/CadastrarEditarFornecedor";
import { ListarFornecedor } from "../../pages/fornecedor/ListarFornecedor";
import { CadastrarEditarFuncionario } from "../../pages/funcionario/CadastrarEditarFuncionario";
import { ListarFuncionarios } from "../../pages/funcionario/ListarFuncionarios";
import { CadastrarEditarPedidoCliente } from "../../pages/pedido/CadastrarEditarPedidoCliente";
import { CadastrarEditarPedidoFornecedor } from "../../pages/pedido/CadastrarEditarPedidoFornecedor";
import { Homepage } from "../../pages/homepage/Homepage";


export const Router = () => {
    return (
        <div className="main-content">
            <div>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
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
                    <Route path="/cargo/cadastrar/" element={<CadastrarCargo />} />
                    <Route path="/cargo/alocar" element={<AlocarCargo />} />
                    <Route path="/tarefa/cadastrar" element={<CadastrarTarefa />} />
                    <Route path="/tarefa/alocar/" element={<AlocarTarefa />} />
                    <Route path="/fornecedor/cadastrar" element={<CadastrarEditarFornecedor />} />
                    <Route path="/fornecedore/editar/:id" element={<CadastrarEditarFornecedor />} />
                    <Route path="/fornecedor/listar" element={<ListarFornecedor />} />
                    <Route path="/funcionario/cadastrar" element={<CadastrarEditarFuncionario />} />
                    <Route path="/funcionario/editar/:id" element={<CadastrarEditarFuncionario />} />
                    <Route path="/funcionario/listar" element={<ListarFuncionarios />} />
                    <Route path="/pedido/cadastrar/cliente" element={<CadastrarEditarPedidoCliente />} />
                    <Route path="/pedido/cadastrar/fornecedor" element={<CadastrarEditarPedidoFornecedor />} />
                </Routes>
            </div>
        </div>
    )
}   