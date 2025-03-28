import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cpf, cnpj } from "cpf-cnpj-validator";
import "./styles.css";

export const GenericForm = ({ initialValues, entity, validationSchema, sections, handleSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const cancelButton = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 3 && pathSegments[1] === "editar") {
      pathSegments[1] = "listar";
      pathSegments.splice(2, 1);
    }

    if(pathSegments.length >= 2 && pathSegments[1] === "cadastrar"){
      pathSegments[1] = "listar";
    }

    const newPath = `/${pathSegments.join("/")}`;
    navigate(newPath);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const updatedValues = { ...values };

        Object.keys(updatedValues).forEach((key) => {
          const value = updatedValues[key];

          if (key.toLowerCase().includes("documento") || key.toLowerCase().includes("cpf") || key.toLowerCase().includes("cnpj")) {
            updatedValues[key] = value ? value.replace(/\D/g, "") : value;
          }

          if (key.toLowerCase().includes("data")) {
            if (!value) {
              updatedValues[key] = undefined;
            } else {
              const currentDate = new Date(value);
              updatedValues[key] = currentDate.toISOString().split("T")[0];
            }
          }
        });

        handleSubmit(updatedValues);
      }}
      enableReinitialize={true}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="form-grid">
              <h3 className="address-title">{section.titleSection}</h3>
              {section.fields.map((field) => (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name}>{field.label} {field.required && "*"}</label>
                  {field.type === "select" ? (
                    <Field 
                      as="select" 
                      id={field.name} 
                      name={field.name} 
                      className="input"
                      style={field.style || {}}
                    >
                      <option value="" disabled>{field.placeholder}</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : field.type === "checkbox" ? (
                    <div className="checkbox-group">
                      <Field type="checkbox" id={field.name} name={field.name} />
                      <label>Sim</label>
                    </div>
                  ) : field.type === "document" ? (
                    <div className="document-group">
                      <Field
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="input"
                        style={field.style || {}}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                          
                          if (value.length <= 11) {
                            value = cpf.format(value); // Formata como CPF
                          } else {
                            value = cnpj.format(value); // Formata como CNPJ
                          }

                          setFieldValue(field.name, value);
                        }}
                        validate={(value) => {
                          const cleanValue = value.replace(/\D/g, "");
                          if (!cleanValue) return "Campo obrigatório";
                          if (cleanValue.length < 11) return "Documento inválido";
                          if (cleanValue.length === 11 && !cpf.isValid(cleanValue)) return "CPF inválido";
                          if (cleanValue.length > 11 && !cnpj.isValid(cleanValue)) return "CNPJ inválido";
                          return undefined;
                        }}
                      />
                    </div>
                  ) : (
                    <Field 
                      type={field.type} 
                      id={field.name} 
                      name={field.name} 
                      placeholder={field.placeholder} 
                      className="input"
                      style={field.style || {}}
                    />
                  )}
                  <ErrorMessage name={field.name} component="span" className="error-message" />
                </div>
              ))}
            </div>
          ))}
          <div className="btn-container">
            <button type="submit" className="btn btn-primary">Salvar</button>
            <button type="button" className="btn btn-secondary" onClick={cancelButton}>Cancelar</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
