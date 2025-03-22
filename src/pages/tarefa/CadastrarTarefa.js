import { useState } from "react";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import { Toast } from "../../components/Toast";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CadastrarTarefa = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        descricao: "",
        datainicio: "",
        datafim: "",
    });

    const fields = [
        {
            title: "Tarefa",
            fields: [
                {
                    label: "Descrição",
                    name: "descricao",
                    type: "textarea",
                    required: true,
                },
                {
                    label: "Data de Início",
                    name: "datainicio",
                    type: "date",
                    required: true,
                },
                {
                    label: "Data de Fim",
                    name: "datafim",
                    type: "date",
                    required: true,
                },
            ],
        },
    ]

    const validationSchema = Yup.object().shape({
        descricao: Yup.string().required("Campo obrigatório"),
        datainicio: Yup.date().required("Campo obrigatório"),
        datafim: Yup.date().required("Campo obrigatório")
            .test("is_after", "A data final deve ser posterior a data inicial", function(value){
                const { datainicio }= this.parent;
                return !value || new Date(value) > new Date(datainicio);
            })
    });

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3306/tarefas/${id}`, values);
                setToastMessage("Tarefa atualizada com sucesso!");
            } else {
                await axios.post(`http://localhost:3306/tarefas`, values);
                setToastMessage("Tarefa cadastrada com sucesso!");
            }
            
            setToastType("success");
            setIsToastOpen(true);
        } catch (error) {
            setToastMessage("Erro ao salvar dados.");
            setToastType("error");
            setIsToastOpen(true);
        }
    }

    return (
            <>
                <TopBar entity={"Tarefas"} useCase={"Cadastrar Tarefa"} />
                <div className="card">
                    <TitleSection title={"Cadastrar Tarefa"} />
                    <GenericForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        sections={fields}
                        handleSubmit={handleSubmit}
                        entity={"Tarefas"}
                        useCase={"Cadastrar Tarefa"}
                        title={"Cadastrar Tarefa"}
                    />
                    <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
                </div>
            </>
    );

}