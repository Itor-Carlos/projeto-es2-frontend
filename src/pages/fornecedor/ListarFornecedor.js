import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";

export const ListarFornecedor = () => {
    const headers = [
        {
            name: "idfornecedor",
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
            <TopBar entity={"Fornecedor"} useCase={"Listar Fornecedores"} textButton={"Novo Fornecedor"} redirectRoute={"/fornecedor/cadastrar"} />
            <div className="card">
                <TitleSection title={"Listar Fornecedores"} />
                <List entity={"fornecedor"} headers={headers} baseUrl={"http://localhost:3306/fornecedores"} />
            </div>
        </>
    );
};