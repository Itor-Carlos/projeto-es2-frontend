import React, { useState } from "react";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarArea = () => {    
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const initialValues = {
        hectares: "",
        emuso: false,
    };

    const validationSchema = Yup.object({
        hectares: Yup.number().typeError("Hectares deve ser um número").positive("Hectares deve ser positivo").required("Campo obrigatório"),
        emuso: Yup.boolean().default(false),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:3306/areas", values);
            setToastMessage("Área cadastrada com sucesso!");
            setToastType("success");
            setIsToastOpen(true);
        } catch (error) {
            setToastMessage("Erro ao cadastrar área.");
            setToastType("error");
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            fields: [
                { label: "Hectares *", type: "number", name: "hectares", placeholder: "Digite o número de hectares" },
                { label: "Em uso?", type: "checkbox", name: "emuso"},
            ],
        },
    ];
    
    return (
        <>
            <TopBar entity={"Áreas"} useCase={"Cadastrar Área"} />
            <div className="card">
                <TitleSection title={"Cadastrar Área"} />
                <GenericForm 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    sections={fields} 
                    handleSubmit={handleSubmit}
                    entity={"Áreas"}
                    useCase={"Cadastrar Área"}
                    title={"Cadastrar Área"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};
