import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";
import { cpf } from "cpf-cnpj-validator";
import { estados } from "../../constantes/estados";

export const CadastrarEditarFuncionario = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        nome: "",
        email: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        cep: "",
        documento: "",
        telefone: "",
        contratacao: "",
        status: "",
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/funcionarios/${id}`)
                .then(response => {

                    const cliente = response.data;

                    const endereco = response.data.endereco;
                    setInitialValues({
                        nome: cliente.nome,
                        email: cliente.email,
                        estado: endereco.estado,
                        cidade: endereco.cidade,
                        bairro: endereco.bairro,
                        logradouro: endereco.logradouro,
                        numero: endereco.numero,
                        cep: endereco.cep,
                        documento: cliente.documento,
                        telefone: cliente.telefone,
                        contratacao: cliente.contratacao,
                        status: cliente.status
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
        nome: Yup.string().typeError("Nome inválido").required("Campo obrigatório"),
        email: Yup.string().typeError("Email inválido").required("Campo obrigatório"),
        documento: Yup.string().typeError("Documento inválido").required("Campo obrigatório"),
        telefone: Yup.string().typeError("Telefone inválido").required("Campo obrigatório"),
        contratacao: Yup.date().typeError("Data de Contratação inválida").required("Campo obrigatório"),
        status: Yup.string().typeError("Status Inválido").required("Campo obrigatório").test(
            "valid-status",
            "Status inválido",
            value => value.toLocaleLowerCase() === "ativo" || value.toLocaleLowerCase() === "inativo"
        ),
        estado: Yup.string().typeError("Estado inválido").required("Campo obrigatório"),
        cidade: Yup.string().typeError("Cidade inválida").required("Campo obrigatório"),
        bairro: Yup.string().typeError("Bairro inválido").required("Campo obrigatório"),
        logradouro: Yup.string().typeError("Logradouro inválido").required("Campo obrigatório"),
        numero: Yup.string().typeError("Número inválido").required("Campo obrigatório"),
        cep: Yup.string().typeError("CEP inválido").required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {
            console.log(values)
            const param = {
                "funcionario": {
                    "nome": values.nome,
                    "email": values.email,
                    "documento": values.documento,
                    "telefone": values.telefone,
                    "contratacao": values.dataContratacao,
                    "status": values.status.toString().toLowerCase()
                },
                "endereco": {
                    "estado": values.estado,
                    "cidade": values.cidade,
                    "bairro": values.bairro,
                    "logradouro": values.logradouro,
                    "numero": values.numero,
                    "cep": values.cep,
                }
            };

            if (isEditing) {
                await axios.put(`http://localhost:3306/funcionarios/${id}`, param);
                console.log('aqui')
                setToastMessage("Funcionário editado com sucesso.");
                setToastType("success");
                setIsToastOpen(true);
            } else {
                await axios.post("http://localhost:3306/funcionarios", param);
                setToastMessage("Funcionário cadastrado com sucesso.");
                setToastType("success");
                setIsToastOpen(true);
            }
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
                { label: "Nome Completo", type: "string", name: "nome", placeholder: "Digite o nome do funcionário", required: true },
                { label: "Documento(CPF/CNPJ)", type: "string", name: "documento", placeholder: "Digite o documento do funcionário", required: true },
                { label: "Email", type: "string", name: "email", placeholder: "Digite o email do funcionário",required: true },
                { label: "Telefone", type: "string", name: "telefone", placeholder: "(00) 000000000", required: true, style: { width: "65%" } },
                { label: "Data de Contratação", type: "date", name: "contratacao",required: true, style: { width: "65%" } },
                { label: "Status", type: "string", name: "status", placeholder: "Digite a empresa do funcionário",required: true, style: { width: "65%" } },
            ],
        },
        {
            titleSection: "Informações do Endereço",
            fields: [
                { label: "CEP", type: "string", name: "cep", placeholder: "Digite o CEP do funcionário", required: true },
                { label: "Estado", type: "select", name: "estado", options: estados, placeholder: "Selecione o estado do funcionário", required: true },
                { label: "Cidade", type: "string", name: "cidade", placeholder: "Digite a cidade do funcionário", required: true },
                { label: "Bairro", type: "string", name: "bairro", placeholder: "Digite o bairro do funcionário", required: true },
                { label: "Logradouro", type: "string", name: "logradouro", placeholder: "Digite o logradouro do funcionário", required: true },
                { label: "Número", type: "string", name: "numero", placeholder: "Digite o número do funcionário", required: true },
            ],
        }
    ];

    return (
        <>
            <TopBar entity={"Funcionarios"} useCase={isEditing ? "Editar Funcionário" : "Cadastrar Funcionário"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Funcionário" : "Cadastrar Funcionário"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Funcionarios"}
                    useCase={isEditing ? "Editar Funcionário" : "Cadastrar Funcionário"}
                    title={isEditing ? "Editar Funcionário" : "Cadastrar Funcionário"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};