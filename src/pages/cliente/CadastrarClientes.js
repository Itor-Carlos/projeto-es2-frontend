import React, { useState } from "react";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";
import { cpf } from "cpf-cnpj-validator";
import { estados } from "../../constantes/estados";

export const CadastrarClientes = () => {
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        nome: "",
        email: "",
        estado: "",
    });

    const validationSchema = Yup.object({
        nome: Yup.string().typeError("Nome inválido").required("Campo obrigatório"),
        email: Yup.string().typeError("Email inválido").required("Campo obrigatório"),
        documento: Yup.string().typeError("Documento inválido").required("Campo obrigatório").test(
            "valid-cpf",
            "CPF inválido",
            value => cpf.isValid(value)
        ),
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
            }
            await axios.post("http://localhost:3306/clientes", param);
            setToastMessage("Cliente cadastrado com sucesso!");
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
            titleSection: "Dados do Cliente",
            fields: [
                { label: "Nome", type: "string", name: "nome", placeholder: "Digite o nome do cliente" },
                { label: "Email", type: "string", name: "email", placeholder: "Digite o email do cliente" },
                { label: "Documento", type: "string", name: "documento", placeholder: "Digite o documento do cliente" },
                { label: "Telefone", type: "string", name: "telefone", placeholder: "Digite o telefone do cliente" },
                { label: "Razão Social", type: "string", name: "razaoSocial", placeholder: "Digite a razão social do cliente" },
                { label: "Empresa", type: "string", name: "empresa", placeholder: "Digite a empresa do cliente" },
            ],
        },
        {
            titleSection: "Endereço do Cliente",
            fields: [
                { label: "Estado", type: "select", name: "estado", options: estados, placeholder: "Selecione o estado do cliente" },
                { label: "Cidade", type: "string", name: "cidade", placeholder: "Digite a cidade do cliente" },
                { label: "Bairro", type: "string", name: "bairro", placeholder: "Digite o bairro do cliente" },
                { label: "Logradouro", type: "string", name: "logradouro", placeholder: "Digite o logradouro do cliente" },
                { label: "Número", type: "string", name: "numero", placeholder: "Digite o número do cliente" },
                { label: "CEP", type: "string", name: "cep", placeholder: "Digite o CEP do cliente" },
            ],
        }
    ];

    return (
        <>
            <TopBar entity={"Clientes"} useCase={"Cadastrar Cliente"} />
            <div className="card">
                <TitleSection title={"Cadastrar Cliente"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Clientes"}
                    useCase={"Cadastrar Cliente"}
                    title={"Cadastrar Cliente"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};