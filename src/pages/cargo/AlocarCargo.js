import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { Toast } from "../../components/Toast";

export const AlocarCargo = () => {
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        idcargo: "",
        idfuncionario: ""
    });

    const [cargos, setCargos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    const validationSchema = Yup.object({
        idcargo: Yup.string()
            .typeError("Nome inválido")
            .required("Campo obrigatório"),
        idfuncionario: Yup.string()
            .typeError("Funcionário inválido")
            .required("Campo obrigatório")
    });

    useEffect(() => {
        async function fetchCargos() {
            try {
                const response = await axios.get("http://localhost:3306/cargos");

                if (response.data && response.data.rows) {
                    const cargosData = response.data.rows.map((cargo) => ({
                        value: cargo.idcargo,
                        label: `${cargo.nome}`
                    }));
                    setCargos(cargosData);
                } else {
                    throw new Error("Estrutura inesperada na resposta da API de cargos");
                }
            } catch (error) {
                console.error("Erro ao buscar cargos:", error);
                setCargos([]);
            }
        }

        async function fetchFuncionarios() {
            try {
                const response = await axios.get("http://localhost:3306/funcionarios");
                if (response.data && response.data.rows) {
                    const funcionariosData = response.data.rows.map((funcionario) => ({
                        value: funcionario.idfuncionario,
                        label: `${funcionario.nome}`
                    }));
                    setFuncionarios(funcionariosData);
                } else {
                    throw new Error("Estrutura inesperada na resposta da API de funcionários");
                }
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
                setFuncionarios([]);
            }
        }

        fetchCargos();
        fetchFuncionarios();

    }, []);

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:3306/alocar_cargo", values);
            setToastMessage("Cargo alocado com sucesso!");
            setToastType("success");
            setIsToastOpen(true);
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            setToastMessage("Erro ao salvar os dados.");
            setToastType("error");
            setIsToastOpen(true);
        }
    };

    const fields = [
        {
            titleSection: "Informações básicas",
            fields: [
                { 
                    label: "Cargo", 
                    type: "select", 
                    name: "idcargo", 
                    options: cargos, 
                    placeholder: "Selecione o Cargo", 
                    required: true
                },
                { 
                    label: "Funcionário", 
                    type: "select", 
                    name: "idfuncionario", 
                    options: funcionarios, 
                    placeholder: "Selecione o Funcionário", 
                    required: true
                }
            ]
        }
    ];

    return (
        <>
            <TopBar entity={"Cargo"} useCase={"Alocar Cargo"} />
            <div className="card">
                <TitleSection title={"Alocar Cargo"} />
                <GenericForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    sections={fields}
                    handleSubmit={handleSubmit}
                    entity={"Cargo"}
                    useCase={"Alocar Cargo"}
                    title={"Alocar Cargo"}
                />
                <Toast 
                    isOpen={isToastOpen} 
                    onClose={() => setIsToastOpen(false)} 
                    message={toastMessage} 
                    type={toastType} 
                />
            </div>
        </>
    );
};
