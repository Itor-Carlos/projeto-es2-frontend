import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { formatDate } from "../../utils/date";

export const ListarFuncionarios = () => {
    const headers = [
        {
            name: "idfuncionario",
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
            type: "string"
        },
        {
            name: "contratacao",
            label: "Data de Contratação",
            type: "date",
            formatFunction: (value) => formatDate(value.contratacao)
        }
    ];

    return (
        <>
            <TopBar entity={"Funcionario"} useCase={"Listar Funcionários"} textButton={"Novo Funcionario"} redirectRoute={"/funcionario/cadastrar"} />
            <div className="card">
                <TitleSection title={"Listar Funcionários"} />
                <List entity={"cliente"} headers={headers} baseUrl={"http://localhost:3306/funcionarios"} />
            </div>
        </>
    );
};