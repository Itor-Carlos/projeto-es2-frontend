import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarGrao = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        tempomaturacao: "",
        periodoplantioinicio: "",
        periodoplantiofim: "",
        coeficienterendimento: ""
    });

    useEffect(() => {
        if(id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/graos/${id}`)
                .then(response => {
                    setInitialValues({
                        tempomaturacao: response.data.tempomaturacao,
                        periodoplantioinicio: response.data.periodoplantioinicio,
                        periodoplantiofim: response.data.periodoplantiofim,
                        coeficienterendimento: response.data.coeficienterendimento
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
        tempomaturacao: Yup.number().typeError("Tempo de maturação deve ser um número").positive("Tempo de maturação deve ser um número positivo").required("Campo obrigatório"),
        periodoplantioinicio: Yup.date().required("Campo obrigatório"),
        periodoplantiofim: Yup.date()
            .test("is_after", "A data final deve ser posterior a data inicial", function(value){
                const { periodoplantioinicio }= this.parent;
                return !value || new Date(value) > new Date(periodoplantioinicio);
            }),
        coeficienterendimento: Yup.number().typeError("Coeficiente de rendimento deve ser um número").positive("Coeficiente de rendimento deve ser um número positivo").required("Campo obrigatório"),
    })

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3306/graos/${id}`, values);
                setToastMessage("Grão atualizado com sucesso!");
            } else {
                await axios.post(`http://localhost:3306/graos`, values);
                setToastMessage("Grão cadastrado com sucesso!");
            }
            setToastType("sucesss");
            setIsToastOpen(true);
        } catch (error) {
            setToastMessage("Erro ao salvar dados.");
            setToastType("error");
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            titleSection: "Informações básicas",
            fields: [
                { label: "Tempo maturação", type: "number", name: "tempomaturacao", placeholder: "Digite o tempo de maturação", required: true},
                { label: "Período Plantio Inicial", type: "date", name: "periodoplantioinicio", required: true},
                { label: "Período Plantio Final", type: "date", name: "periodoplantiofim"},
                { label: "Coeficiente de Rendimento", type: "number", name: "coeficienterendimento", placeholder: "Informe o coeficiente de rendimento", required: true},
            ],
        },
    ];

    return (
        <>
        <TopBar entity={"Grãos"} useCase={isEditing ? "Editar Grão" : "Cadastrar Grão"} />
        <div className="card">
            <TitleSection title={isEditing ? "Editar Grão" : "Cadastrar Grão"} />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                sections={fields}
                handleSubmit={handleSubmit}
                entity={"Grãos"}
                useCase={isEditing ? "Editar Grão" : "Cadastrar Grão"}
                title={isEditing ? "Editar Grão" : "Cadastrar Grão"}
            />
            <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
        </div>
        </>
    );
}