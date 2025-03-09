
import { GenericForm } from "../../components/Form";
import * as Yup from "yup";
import axios from "axios";

export const CadastrarArea = () => {    
    const initialValues = {
        hectares: "",
        emuso: "",
    };

    const validationSchema = Yup.object({
        hectares: Yup.number().required("Campo obrigatório"),
        emuso: Yup.boolean(),
    });

    const handleSubmit = async (event) => {
        const request = await axios.post("http://localhost:3306/areas", {
            hectares: event.hectares,
            emuso: event.emuso,
        });
    }

    const fields = [
        {
          fields: [
            { label: "Hectares *", type: "text", name: "hectares", size: "50%", placeholder: "Digite o número de hectares" },
            { label: "Em uso?", type: "checkbox", name: "emuso", size: "10%"},
          ],
        },
      ];
      


    return (
        <GenericForm 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            sections={fields} 
            handleSubmit={handleSubmit}
            entity={"Áreas"}
            useCase={"Cadastrar Área"}
            title={"Cadastrar Área"}
        />
    )
}