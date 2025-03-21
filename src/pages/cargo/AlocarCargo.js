import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const AlocarCargo = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        nome: "",
        funcionario: ""
    });

    const validationSchema = Yup.object({
        nome: Yup.string().typeError("Nome inválido").required("Campo obrigatório"),
        funcionario: Yup.string().typeError("Funcionário inválido").required("Campo obrigatório")
    });

    useEffect(() => {
        if(id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/cargos/alocar`) // Falta implementar a rota
                .then(response => {
                    setInitialValues({
                        nome: response.data.nome,
                        funcionario: response.data.funcionario
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setToastMessage("Erro ao carregar os dados.");
                    setToastType("error");
                    setIsToastOpen(true);
                });
        }
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            if(isEditing) {
                await axios.put(`http://localhost:3306/cargos/alocar`, values); // Falta implementar a rota
                setToastMessage("Cargo alocado com sucesso!");
            }
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
                { label: "Cargo", type: "string", name: "nome", placeholder: "Selecione o Cargo", required: true},
                { label: "Funcionário", type: "string", name: "funcionario", placeholder: "Selecione o Funcionário", required: true}
            ],
        },
    ];

    return (
        <>
        <TopBar entity={"Cargo"} useCase={"Alocar Cargo"} />
        <div className="card">
            <TitleSection title="Alocar Grão"/>
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                sections={fields}
                handleSubmit={handleSubmit}
                entity={"Cargo"}
                useCase={"Alocar Cargo" }
                title={"Alocar Cargo" }
            />
            <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
        </div>
        </>
    );
}