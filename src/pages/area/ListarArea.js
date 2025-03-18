import { useEffect, useState } from "react";
import { List } from "../../components/List";
import { TitleSection } from "../../components/TitleSection";
import { TopBar } from "../../components/TopBar";
import { type } from "@testing-library/user-event/dist/type";

export const ListarArea = () => {
    const headers = [
        {
            name: "idarea",
            label: "ID",
            type: "number"
        },
        {
            name: "hectares",
            label: "Hectares",
            type: "number"
        },
        {
            name: "emuso",
            label: "Em Uso",
            type: 'boolean'
        }
    ];
    
    return (
        <>
            <TopBar entity={"Área"} useCase={"Listar Área"} textButton={"Nova Área"} redirectRoute={"/area/cadastrar"}/>
            <div className="card">
                <TitleSection title={"Listar Área"} />
                <List entity={"área"} headers={headers} baseUrl={"http://localhost:3306/areas"}/>
            </div>
        </>
    );
};
