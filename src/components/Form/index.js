import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./styles.css"; 
import { TopBar } from "../TopBar";

export const GenericForm = ({ initialValues, validationSchema, title, sections, handleSubmit }) => {
  return (
    <div className="main-content">
      <TopBar entity={"Fornecedores"} useCase={"Cadastrar Fornecedor"}/>
      
      <div className="card">
        <h1 style={{ fontSize: "32px" }}>{title}</h1>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="form-grid">
                  <h3 className="address-title">{section.titleSection}</h3>
                  
                  {section.fields.map((field) => (
                    <div 
                      key={field.name} 
                      className="form-group"
                      style={field.style || {}}
                    >
                      <label htmlFor={field.name}>{field.label} {field.required && "*"}</label>
                      {field.type === "select" ? (
                        <Field 
                          as="select" 
                          id={field.name} 
                          name={field.name} 
                          className="input"
                        >
                          <option value="" disabled>{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field 
                          type={field.type} 
                          id={field.name} 
                          name={field.name} 
                          placeholder={field.placeholder} 
                          className="input"
                        />
                      )}
                      <ErrorMessage name={field.name} component="span" className="error-message" />
                    </div>
                  ))}
                </div>
              ))}
              
              <div className="btn-container">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-secondary">Cancelar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};