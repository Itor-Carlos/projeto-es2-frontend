import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarFertilizante = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        composicao: "",
        estadofisico: "",
        periodoaplicacaodias: 0,
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/fertilizantes/${id}`)
                .then(response => {
                    setInitialValues({
                        composicao: response.data.composicao,
                        estadofisico: response.data.estadofisico,
                        periodoaplicacaodias: response.data.periodoaplicacaodias,
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

    const validationSchema = Yup.object({
        composicao: Yup.string().typeError("Composição inválida").required("Campo obrigatório"),
        estadofisico: Yup.string().typeError("Estado Fisico inválido").required("Campo obrigatório"),
        periodoaplicacaodias: Yup.number().typeError("Periodo de Aplicação inválido").required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3306/fertilizantes/${id}`, values);
                setToastMessage("Fertilizante atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3306/fertilizantes/", values);
                setToastMessage("Fertilizante cadastrado com sucesso!");
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
            fields: [
                { label: "Composição", type: "string", name: "composicao", placeholder: "Digite a composição do fertilizante" },
                { label: "Estado Fisico", type: "string", name: "estadofisico", placeholder: "Digite o estado fisico do fertilizante" },
                { label: "Periodo de Aplicação (Dias)", type: "number", name: "periodoaplicacaodias", placeholder: "Digite o periodo de aplicação do fertilizante" },
            ],
        },
    ];

    return (
        <>
            <TopBar entity={"Fertilizante"} useCase={isEditing ? "Editar Fertilizante" : "Cadastrar Fertilizante"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Fertilizante" : "Cadastrar Fertilizante"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Fertilizante"}
                    useCase={isEditing ? "Editar Fertilizante" : "Cadastrar Fertilizante"}
                    title={isEditing ? "Editar Fertilizante" : "Cadastrar Fertilizante"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};
