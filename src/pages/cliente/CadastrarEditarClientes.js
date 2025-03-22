import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";
import { estados } from "../../constantes/estados";
import Validation from "../../utils/validations";

export const CadastrarEditarClientes = () => {
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
        razaoSocial: "",
        empresa: "",
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/clientes/${id}`)
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
                        razaoSocial: cliente.razaosocial,
                        empresa: cliente.empresa,
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
        documento: Yup.string().typeError("Documento inválido").required("Campo obrigatório").test("valid-document", "Documento inválido", (value) => {
            if (!value) return false;
            return Validation.validateCpfCnpj(value);
        }),
        telefone: Yup.string().typeError("Telefone inválido").required("Campo obrigatório"),
        razaoSocial: Yup.string().typeError("Razão Social inválida").required("Campo obrigatório"),
        empresa: Yup.string().typeError("Empresa inválida").required("Campo obrigatório"),
        estado: Yup.string().typeError("Estado inválido").required("Campo obrigatório"),
        cidade: Yup.string().typeError("Cidade inválida").required("Campo obrigatório"),
        bairro: Yup.string().typeError("Bairro inválido").required("Campo obrigatório"),
        logradouro: Yup.string().typeError("Logradouro inválido").required("Campo obrigatório"),
        numero: Yup.string().typeError("Número inválido").required("Campo obrigatório"),
        cep: Yup.string().typeError("CEP inválido").required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {
            const param = {
                "cliente": {
                    "nome": values.nome,
                    "email": values.email,
                    "documento": values.documento,
                    "telefone": values.telefone,
                    "razaosocial": values.razaoSocial,
                    "empresa": values.empresa,
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
                await axios.put(`http://localhost:3306/clientes/${id}`, param);
                setToastMessage("Cliente atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3306/clientes", param);
                setToastMessage("Cliente cadastrado com sucesso!");
            }
            setToastType("success");
            setIsToastOpen(true);
        } catch (error) {
            if (error.response) {
                setToastMessage(error.response.data.message || "Erro ao processar a solicitação.");
            } else if (error.request) {
                setToastMessage("Erro de rede: Não foi possível conectar ao servidor.");
            } else {
                setToastMessage("Erro inesperado: " + error.message);
            }
            setToastType("error");
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            titleSection: "Dados do Cliente",
            fields: [
                { label: "Nome Completo", type: "string", name: "nome", placeholder: "Digite o nome do cliente", required: true },
                { label: "Documento (CPF/CNPJ)", type: "string", name: "documento", placeholder: "Digite o documento do cliente", required: true },
                { label: "Razão Social", type: "string", name: "razaoSocial", placeholder: "Digite a razão social do cliente", required: true },
                { label: "Telefone", type: "string", name: "telefone", placeholder: "Digite o telefone do cliente", required: true },
                { label: "Email", type: "string", name: "email", placeholder: "Digite o email do cliente", required: true },
                { label: "Empresa", type: "string", name: "empresa", placeholder: "Digite a empresa do cliente", required: true },
            ],
        },
        {
            titleSection: "Endereço do Cliente",
            fields: [
                { label: "CEP", type: "string", name: "cep", placeholder: "Digite o CEP do cliente", required: true },
                { label: "Estado", type: "select", name: "estado", options: estados, placeholder: "Selecione o estado do cliente", required: true },
                { label: "Cidade", type: "string", name: "cidade", placeholder: "Digite a cidade do cliente", required: true },
                { label: "Bairro", type: "string", name: "bairro", placeholder: "Digite o bairro do cliente", required: true },
                { label: "Logradouro", type: "string", name: "logradouro", placeholder: "Digite o logradouro do cliente", required: true },
                { label: "Número", type: "string", name: "numero", placeholder: "Digite o número do cliente", required: true },
            ],
        }
    ];

    return (
        <>
            <TopBar entity={"Clientes"} useCase={isEditing ? "Editar Cliente" : "Cadastrar Cliente"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Cliente" : "Cadastrar Cliente"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Clientes"}
                    useCase={isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
                    title={isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};