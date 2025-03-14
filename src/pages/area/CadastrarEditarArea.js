import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarArea = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        hectares: "",
        emuso: false,
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/areas/${id}`)
                .then(response => {
                    setInitialValues({
                        hectares: response.data.hectares,
                        emuso: response.data.emuso,
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
        hectares: Yup.number().typeError("Hectares deve ser um número").positive("Hectares deve ser positivo").required("Campo obrigatório"),
        emuso: Yup.boolean().default(false),
    });

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3306/areas/${id}`, values);
                setToastMessage("Área atualizada com sucesso!");
            } else {
                await axios.post("http://localhost:3306/areas", values);
                setToastMessage("Área cadastrada com sucesso!");
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
                { label: "Hectares *", type: "number", name: "hectares", placeholder: "Digite o número de hectares" },
                { label: "Em uso?", type: "checkbox", name: "emuso" },
            ],
        },
    ];

    return (
        <>
            <TopBar entity={"Áreas"} useCase={isEditing ? "Editar Área" : "Cadastrar Área"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Área" : "Cadastrar Área"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Áreas"}
                    useCase={isEditing ? "Editar Área" : "Cadastrar Área"}
                    title={isEditing ? "Editar Área" : "Cadastrar Área"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};
