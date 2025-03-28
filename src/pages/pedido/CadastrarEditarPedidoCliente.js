import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";
import { formatTime } from "../../utils/time";

export const CadastrarEditarPedidoCliente = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(!!id);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [initialValues, setInitialValues] = useState({
        idcliente: "",
        idproduto: "",
        quantidade: 0,
        precounitario: 0.0,
        valortotal: 0.0,
        datapedido: "",
        descricao: "",
        idpedido: "",
        iditem: "",
        hora: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesRes, produtosRes] = await Promise.all([
                    axios.get("http://localhost:3306/clientes"),
                    axios.get("http://localhost:3306/produtos")
                ]);

                setClientes(clientesRes.data.rows.map(cliente => ({ value: cliente.idcliente, label: cliente.nome })));
                setProdutos(produtosRes.data.rows.map(produto => ({ value: produto.idproduto, label: produto.nome })));
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        if (id) {
            axios.get(`http://localhost:3306/itens/${id}?entity=cliente`)
                .then(response => {
                    const pedido = response.data.rows[0];
                    const item = pedido.itens[0];
                    const produto = item.produto;
                    const cliente = item.clientes[0];

                    console.group(pedido.hora.toString())

                    setInitialValues({
                        idcliente: cliente.idcliente,
                        idproduto: produto.idproduto,
                        quantidade: item.quantidade,
                        precounitario: produto.precounitario,
                        valortotal: pedido.valor,
                        datapedido: pedido.data,
                        descricao: pedido.descricao,
                        hora: formatTime(pedido.hora),
                        idpedido: pedido.idpedido,
                        iditem: item.iditem,
                    });
                })
                .catch(error => {
                    console.error(error);
                    setToastMessage("Erro ao carregar os dados.");
                    setToastType("error");
                    setIsToastOpen(true);
                });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        setInitialValues(prev => ({
            ...prev,
            valortotal: (prev.quantidade * prev.precounitario).toFixed(2),
        }));
    }, [initialValues.quantidade, initialValues.precounitario]);

    const validationSchema = Yup.object({
        idcliente: Yup.number().required("Campo obrigatório"),
        idproduto: Yup.string().required("Campo obrigatório"),
        quantidade: Yup.number().positive().required("Campo obrigatório"),
        precounitario: Yup.number().positive().required("Campo obrigatório"),
        valortotal: Yup.number().positive().required("Campo obrigatório"),
        datapedido: Yup.date().required("Campo obrigatório"),
        hora: Yup.string().required("Campo obrigatório"),
    });

    const handleSubmit = async (values) => {
        try {
            const pedido = { valor: values.valortotal, data: values.datapedido, hora: values.hora };
            const item = { quantidade: values.quantidade };
            const produto = { precounitario: values.precounitario, descricao: values.descricao, idproduto: values.idproduto };
            const param = { item, produto, pedido, idcliente: values.idcliente };

            if (isEditing) {
                param.pedido.idpedido = values.idpedido;
                param.item.iditem = values.iditem;
                await axios.put(`http://localhost:3306/itens/${id}`, param);
                setToastMessage("Pedido atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3306/itens", param);
                setToastMessage("Pedido cadastrado com sucesso!");
            }
            setToastType("success");
        } catch (error) {
            setToastMessage(error.response?.data?.message || "Erro ao processar a solicitação.");
            setToastType("error");
        } finally {
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            titleSection: "Informações do Pedido",
            fields: [
                { label: "Cliente", type: "select", placeholder: "Selecione um cliente" ,options: clientes, name: "idcliente", required: true },
                { label: "Produto", type: "select", options: produtos, placeholder: "Selecione um produto" ,name: "idproduto", required: true },
                { label: "Quantidade", type: "number", name:"quantidade", required: true },
                { label: "Preço Unitário", type: "number", name: "precounitario", required: true },
                { label: "Valor Total R$", type: "number", name: "valortotal", required: true, disabled: true },
                { label: "Data do Pedido", type: "date", name: "datapedido", required: true },
                { label: "Hora do Pedido", type: "time", name: "hora", required: true },
            ],
        },
        {
            titleSection: "",
            fields: [
                { label: "Descrição", type: "textarea", name: "descricao", required: true, style: { width: "1060px" } },
            ]
        }
    ];

    return (
        <>
            <TopBar entity="Pedidos" useCase={isEditing ? "Editar Pedido de Cliente" : "Cadastrar Pedido de Cliente"} />
            <div className="card">
                <TitleSection title={isEditing ? "Editar Pedido" : "Cadastrar Pedido"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity="Pedidos"
                    useCase={isEditing ? "Editar Pedido" : "Cadastrar Pedido"}
                />
                <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
            </div>
        </>
    );
};
