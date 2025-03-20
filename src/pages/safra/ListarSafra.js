import { useEffect, useState } from "react";
import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { formatDate } from "../../utils/date";

export const ListarSafra = () => {
    const headers = [
        {
            name: "idsafra",
            label: "ID",
            type: "number"
        },
        {
            name: "quantidadeprevista",
            label: "Quantidade Prevista",
            type: "number"
        },
        {
            name: "datainicio",
            label: "Data de Início",
            type: 'date',
            formatFunction: (value) => formatDate(value.datainicio)
        },
        {
            name: "datafim",
            label: "Data de Fim",
            type: 'date',
            formatFunction: (value) => formatDate(value.datafim)
        }
    ];
    
    return (
        <>
            <TopBar entity={"Safra"} useCase={"Listar Safra"} textButton={"Nova Safra"} redirectRoute={"/safra/cadastrar"}/>
            <div className="card">
                <TitleSection title={"Listar Safra"} />
                <List entity={"safra"} headers={headers} baseUrl={"http://localhost:3306/safras"}/>
            </div>
        </>
    );
};
