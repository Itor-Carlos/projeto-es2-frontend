import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarCargo = () => {
    const { id } = useParams();
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        nome: "",
    });

    const validationSchema = Yup.object({
        nome: Yup.string().typeError("Nome inválido").required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:3306/cargos", values);
            setToastMessage("Cargo cadastrado com sucesso!");
            setToastType("success");
            setIsToastOpen(true);
        } catch (error) {
            setToastMessage("Erro ao salvar os dados.");
            setToastType("error");
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            titleSection: "Informações básicas",
            fields: [
                { label: "Nome do cargo", type: "string", name: "nome", placeholder: "Digite o nome do cargo", required: true},
            ],
        },
    ];

    return (
        <>
        <TopBar entity={"Cargo"} useCase={"Cadastrar Cargo"} />
        <div className="card">
            <TitleSection title={"Cadastrar Cargo"} />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                sections={fields}
                handleSubmit={handleSubmit}
                entity={"Cargo"}
                useCase={"Cadastrar Cargo"}
                title={"Cadastrar Cargo"}
            />
            <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
        </div>
        </>
    );
}