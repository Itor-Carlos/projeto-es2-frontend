import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const CadastrarEditarPedidoFornecedor = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        idfornecedor: "",
        idproduto: "",
        quantidade: 0,
        precounitario: 0.0,
        valortotal: 0.0,
        datapedido: "",
        descricao: "",
    });
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        const fetchClientes = async () => {
            try {
                const response = await axios.get("http://localhost:3306/fornecedores");
                if (response.data && response.data.rows) {
                    const fornecedoresData = response.data.rows.map((fornecedor) => ({ value: fornecedor.idfornecedor, label: `${fornecedor.nome}` }));
                    setClientes(fornecedoresData);
                }
            } 
            catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        }

        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:3306/produtos");
                if (response.data && response.data.rows) {
                    const produtosData = response.data.rows.map((produto) => ({ value: produto.idproduto, label: `${produto.nome}` }));
                    setProdutos(produtosData);
                }
            }
            catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }

        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:3306/fornecedores/${id}`)
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
        };
        fetchClientes();
        fetchProdutos()
    }, [id]);

    useEffect(() => {
        const quantidade = Number(initialValues.quantidade) || 0;
        const precounitario = Number(initialValues.precounitario) || 0;
        const total = quantidade * precounitario;
    
        setInitialValues((prevValues) => ({
            ...prevValues,
            valortotal: total.toFixed(2),
        }));
    }, [initialValues.quantidade, initialValues.precounitario]);

    const validationSchema = Yup.object({
        idfornecedor: Yup.number().typeError("Fornecedor inválido").required("Campo obrigatório"),
        idproduto: Yup.string().required("Campo obrigatório"),
        quantidade: Yup.number().typeError("Quantidade inválida").positive("A quantidade deve ser positiva").required("Campo obrigatório"),
        precounitario: Yup.number().typeError("Preço Unitário inválido").positive("O preço unitário deve ser positivo").required("Campo obrigatório"),
        valortotal: Yup.number().typeError("Valor total inválido").positive("O valor total deve ser positivo").required("Campo obrigatório"),
        datapedido: Yup.date().typeError("Data inválida").required("Campo obrigatório"),
        hora: Yup.string().required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {

            console.log(values);
            const produtoSelecionado = produtos.find(produto => String(produto.value) === String(values.idproduto));

            const pedido = {
                valor: values.valortotal,
                data: values.datapedido,
                hora: values.hora
            }

            const item = {
                quantidade: values.quantidade,
            }
            
            const produto = {
                precounitario: values.precounitario,
                descricao: values.descricao,
                nome: produtoSelecionado.label,
            }
            
            const param = {
                item,
                produto,
                pedido,
                idfornecedor: values.idfornecedor,
            };

            if (isEditing) {
                await axios.put(`http://localhost:3306/itens/${id}`, param);
                setToastMessage("Pedido atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3306/itens", param);
                setToastMessage("Pedido cadastrado com sucesso!");
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
            titleSection: "Informações do Pedido",
            fields: [
                { label: "Fornecedor", type: "select", options: clientes, name: "idfornecedor", placeholder: "Selecione o Fornecedor", required: true },
                { label: "Produto", type: "select", options: produtos, name: "idproduto", placeholder: "Selecione o Produto", required: true },
                { label: "Quantidade", type: "number", name:"quantidade", placeholder: "Digite a quantidade do produto", required: true },
                { label: "Preço Unitário", type: "number", name: "precounitario", placeholder: "Digite o preço unitário do produto", required: true },
                { label: "Valor Total R$", type: "number", name: "valortotal", placeholder: "Valor total da compra", required: true },
                { label: "Data do Pedido", type: "date", name: "datapedido", placeholder: "", required: true },
                { label: "Hora do Pedido", type: "time", name: "hora", placeholder: "", required: true },
            ],
        },
        {
            titleSection: "",
            fields: [
                { label: "Descrição", type: "textarea", name: "descricao", placeholder: "Digite uma descrição para o pedido", required: true, style: { width: "1130px" } },
            ]
        }
    ];

    return (
        <>
            <TopBar entity={"Pedidos"} useCase={isEditing ? "Editar Pedido de Fornecedor" : "Cadastrar Pedido de Fornecedor"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Pedido" : "Cadastrar Pedido"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Pedidos"}
                    useCase={isEditing ? "Editar Pedido" : "Cadastrar Pedido"}
                    title={isEditing ? "Editar Pedido" : "Cadastrar Pedido"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};