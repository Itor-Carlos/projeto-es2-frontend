import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { formatDate } from "../../utils/date";
import { formatTime } from "../../utils/time";

export const ListarPedidosFornecedores = () => {
    const headers = [
        {
            name: "idpedido",
            label: "ID",
            type: "number"
        },
        {
            name: "valor",
            label: "Valor",
            type: "number"
        },
        {
            name: "data",
            label: "Data do Pedido",
            type: 'date',
            formatFunction: (value) => formatDate(value.data)
        },
        {
            name: "hora",
            label: "Hora",
            type: 'date',
            formatFunction: (value) => formatTime(value.hora)   

        },
        {
            name: "nomeCliente",
            label: "Nome do Fornecedor",
            type: "text",
            formatFunction: (value) => value.itens[0]?.fornecedores[0]?.nome
        },
        {
            name: "nomeProduto",
            label: "Nome do Produto",
            type: "text",
            formatFunction: (value) => value.itens[0]?.produto?.nome
        }
    ];
    
    return (
        <>
            <TopBar entity={"Pedidos"} useCase={"Listar Pedidos de Fornecedores"} textButton={"Novo Pedido"} redirectRoute={"/pedido/fornecedor/cadastrar"}/>
            <div className="card">
                <TitleSection title={"Listar Pedidos de Fornecedores"} />
                <List entity={"safra"} headers={headers} baseUrl={"http://localhost:3306/itens"} additionalParameters={[{"entity": "fornecedor"}]
                }/>
            </div>
        </>
    );
};
