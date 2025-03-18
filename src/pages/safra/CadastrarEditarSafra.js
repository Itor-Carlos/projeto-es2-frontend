import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarSafra = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        quantidadeprevista: "",
        datainicio: "",
        datafim: undefined,
        idgrao: ""
    });

    const [graos, setGraos] = useState([]);

    useEffect(() => {
        
        async function fetchGraos() {
            try {
                const response = await axios.get("http://localhost:3306/graos");

                const graos = response.data.rows.map((grao) => {
                    return {
                        value: grao.idgrao,
                        label: `${grao.idgrao} - ${grao.tempomaturacao}`
                    }
                });
                
                setGraos(graos);
            } catch (error) {
                console.log(error);
            }
        }        

        fetchGraos();

        if(id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/graos/${id}`)
                .then(response => {
                    setInitialValues({
                        quantidadeprevista: response.data.quantidadeprevista,
                        datainicio: response.data.datainicio,
                        datafim: response.data.datafim,
                        idgrao: graos.filter((grao) => grao.value === response.data.idgrao)[0].value
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
        quantidadeprevista: Yup.number().typeError("Quantidade prevista deve ser um número").positive("Quantidade prevista deve ser um número positivo").required("Campo obrigatório"),
        datainicio: Yup.date().required("Campo obrigatório"),
        datafim: Yup.date()
            .test("is_after", "A data final deve ser posterior a data inicial", function(value){
                const { datainicio }= this.parent;
                return !value || new Date(value) > new Date(datainicio);
            }),
        idgrao: Yup.number().required("Campo obrigatório").typeError("Safra deve ser um número").positive("Safra deve ser um número positivo")
    })

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3306/safras/${id}`, values);
                setToastMessage("Safra atualizado com sucesso!");
            } else {
                await axios.post(`http://localhost:3306/safras`, values);
                setToastMessage("Safra cadastrado com sucesso!");
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
                { label: "Quantidade Prevista", type: "number", name: "quantidadeprevista", placeholder:"Quantidade prevista", required: true},
                { label: "Data de Início", type: "date", name: "datainicio", required: true},
                { label: "Data de Fim", type: "date", name: "datafim"},
                { label: "Grão da Safra", type: "select", options: graos ,name: "idgrao", placeholder: "Selecione o grão", required: true},
            ],
        },
    ];

    return (
        <>
        <TopBar entity={"Safras"} useCase={isEditing ? "Editar Safra" : "Cadastrar Safra"} />
        <div className="card">
            <TitleSection title={isEditing ? "Editar Safra" : "Cadastrar Safra"} />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                sections={fields}
                handleSubmit={handleSubmit}
                entity={"Safras"}
                useCase={isEditing ? "Editar Safra" : "Cadastrar Safra"}
                title={isEditing ? "Editar Safra" : "Cadastrar Safra"}
            />
            <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
        </div>
        </>
    );
}