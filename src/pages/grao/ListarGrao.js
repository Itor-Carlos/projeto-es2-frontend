import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { formatDate } from "../../utils/date";


export const ListarGrao = () => {
    const headers = [
        {
            name: "idgrao",
            label: "Id",
            type: "number"
        },
        {
            name: "tempomaturacao",
            label: "Tempo Maturação",
            type: "number"
        },
        {
            name: "periodoplantioinicio",
            label: "Período Plantio Início",
            type: "date",
            formatFunction: (value) => formatDate(value.periodoplantioinicio)
        },
        {
            name: "periodoplantiofim",
            label: "Período Plantio Fim",
            type: "date",
            formatFunction: (value) => formatDate(value.periodoplantiofim)
        },
        {
            name: "coeficienterendimento",
            label: "Coeficiente de Rendimento",
            type: "number",
            formatFunction: (value) =>`${value.coeficienterendimento}%`
        }
    ];

    return (
        <>
        <TopBar entity={"Grão"} useCase={"Listar Grãos"} textButton={"Novo Grão"} redirectRoute={"/grao/cadastrar"}/>
        <div className="card">
            <TitleSection title={"Listar Grãos"}/>
            <List entity={"grão"} headers={headers} baseUrl={"http://localhost:3306/graos"}/>
        </div>
        </>
    );
};