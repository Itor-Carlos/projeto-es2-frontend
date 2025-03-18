import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";

export const ListarFertilizante = () => {
    const headers = [
        {
            name: "idfertilizante",
            label: "ID",
            type: "number"
        },
        {
            name: "composicao",
            label: "Composição",
            type: "string"
        },
        {
            name: "estadofisico",
            label: "Estado Fisico",
            type: 'string'
        },
        {
            name: "periodoaplicacaodias",
            label: "Periodo de Aplicação (Dias)",
            type: 'number'
        }
    ];
    
    return (
        <>
            <TopBar entity={"Fertilizante"} useCase={"Listar Fertilizante"} textButton={"Novo Fertilizante"} redirectRoute={"/fertilizante/cadastrar"}/>
            <div className="card">
                <TitleSection title={"Listar Fertilizante"} />
                <List entity={"fertilizante"} headers={headers} baseUrl={"http://localhost:3306/fertilizantes"}/>
            </div>
        </>
    );
};
