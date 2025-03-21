import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarCargo = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        nome: "",
    });

    const validationSchema = Yup.object({
        nome: Yup.string().typeError("Nome inválido").required("Campo obrigatório"),
    });

    useEffect(() => {
        if(id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/cargos/${id}`)
                .then(response => {
                    setInitialValues({
                        nome: response.data.nome,
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
                await axios.put(`http://localhost:3306/cargos/${id}`, values);
                setToastMessage("Cargo atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3306/cargos", values);
                setToastMessage("Cargo cadastrado com sucesso!");
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
                { label: "Nome do cargo", type: "string", name: "nome", placeholder: "Digite o nome do cargo", required: true},
            ],
        },
    ];

    return (
        <>
        <TopBar entity={"Cargo"} useCase={isEditing ? "Editar Cargo" : "Cadastrar Cargo"} />
        <div className="card">
            <TitleSection title={isEditing ? "Editar Grão" : "Cadastrar Grão"} />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                sections={fields}
                handleSubmit={handleSubmit}
                entity={"Cargo"}
                useCase={isEditing ? "Editar Cargo" : "Cadastrar Cargo"}
                title={isEditing ? "Editar Cargo" : "Cadastrar Cargo"}
            />
            <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
        </div>
        </>
    );
}