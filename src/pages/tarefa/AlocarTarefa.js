import { useEffect, useState } from "react";
import { TopBar } from "../../components/TopBar";
import { TitleSection } from "../../components/TitleSection";
import { GenericForm } from "../../components/Form";
import axios from "axios";
import * as Yup from "yup";
import { Toast } from "../../components/Toast";

export const AlocarTarefa = () => {
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [initialValues, setInitialValues] = useState({
        idtarefa: "",
        idfuncionario: ""
    });

    const [tarefas, setTarefas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [responseTarefas, responseFuncionarios] = await Promise.all([
                    axios.get("http://localhost:3306/tarefas"),
                    axios.get("http://localhost:3306/funcionarios")
                ]);
            
                const { rows: tarefasData } = responseTarefas.data;
                const { rows: funcionariosData } = responseFuncionarios.data;
            
                const tarefas = tarefasData.map(({ idtarefa, descricao }) => ({
                    value: idtarefa,
                    label: `${idtarefa} - ${descricao}`
                }));
            
                const funcionarios = funcionariosData.map(({ idfuncionario, nome }) => ({
                    value: idfuncionario,
                    label: `${idfuncionario} - ${nome}`
                }));
            
                setFuncionarios(funcionarios);
                setTarefas(tarefas);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    
        fetchData();
    }, []);
    

    const fields = [
        {
            title: "AlocarTarefa",
            fields: [
                {
                    label: "Tarefa",
                    name: "idtarefa",
                    type: "select",
                    required: true,
                    options: tarefas
                },
                {
                    label: "Funcionário",
                    name: "idfuncionario",
                    type: "select",
                    required: true,
                    options: funcionarios
                }
            ],
        },
    ]

    const handleSubmit = async (values) => {
        try {
            const request = await axios.post("http://localhost:3306/tarefas/alocar_tarefa", values);

            if(request.status !== 201){
                setToastMessage("Tarefa já foi alocada para esse funcionário.");
            }
            else{
                setToastMessage("Tarefa alocada com sucesso!");
                setToastType("success");
                setIsToastOpen(true);
            }
        } catch (error) {

            if(error?.response?.status === 400){
                setToastMessage(error?.response?.data?.message);
            }
            else{
                setToastMessage("Erro ao alocar tarefa.");
            }
            setToastType("error");
            setIsToastOpen(true);
        }
    };
    
    const validationSchema = Yup.object().shape({
        idtarefa: Yup.number().required("Campo obrigatório"),
        idfuncionario: Yup.number().required("Campo obrigatório")
    });
    

    
    return (
            <>
                <TopBar entity={"Tarefas"} useCase={"Alocar Tarefa"} />
                <div className="card">
                    <TitleSection title={"Alocar Tarefa"} />
                    <GenericForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        sections={fields}
                        handleSubmit={handleSubmit}
                        entity={"Tarefas"}
                        useCase={"Alocar Tarefa"}
                        title={"Alocar Tarefa"}
                    />
                    <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
                </div>
            </>
        );    
}