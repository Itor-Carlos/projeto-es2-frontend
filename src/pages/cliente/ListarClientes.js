import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";

export const ListarClientes = () => {
    const headers = [
        {
            name: "idcliente",
            label: "ID",
            type: "number"
        },
        {
            name: "nome",
            label: "Nome",
            type: "string"
        },
        {
            name: "email",
            label: "Email",
            type: "string"
        },
        {
            name: "telefone",
            label: "Telefone",
            type: "string"
        },
        {
            name: "documento",
            label: "Documento",
            type: "document"
        }
    ];

    return (
        <>
            <TopBar entity={"Cliente"} useCase={"Listar Clientes"} textButton={"Novo Cliente"} redirectRoute={"/cliente/cadastrar"} />
            <div className="card">
                <TitleSection title={"Listar Clientes"} />
                <List entity={"cliente"} headers={headers} baseUrl={"http://localhost:3306/clientes"} />
            </div>
        </>
    );
};