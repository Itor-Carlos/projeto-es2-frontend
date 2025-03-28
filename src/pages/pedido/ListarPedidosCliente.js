import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { formatDate } from "../../utils/date";

export const ListarPedidosClientes = () => {
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
            type: 'date'
        },
        {
            name: "nomeCliente",
            label: "Nome do Cliente",
            type: "text",
            formatFunction: (value) => value.itens[0]?.clientes[0]?.nome
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
            <TopBar entity={"Pedidos"} useCase={"Listar Pedidos de Clientes"} textButton={"Novo Pedido"} redirectRoute={"/pedido/cliente/cadastrar"}/>
            <div className="card">
                <TitleSection title={"Listar Pedidos de Clientes"} />
                <List entity={"safra"} headers={headers} baseUrl={"http://localhost:3306/itens"} additionalParameters={[{"entity": "cliente"}]
                }/>
            </div>
        </>
    );
};
