import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./styles.css";

export const GenericForm = ({ initialValues, validationSchema, sections, handleSubmit }) => {
  return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
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
                      ) : field.type === "checkbox" ? (
                        <div className="checkbox-group">
                          <Field 
                            type="checkbox" 
                            id={field.name} 
                            name={field.name} 
                          />
                          <label>Sim</label>
                        </div>
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
  );
};
