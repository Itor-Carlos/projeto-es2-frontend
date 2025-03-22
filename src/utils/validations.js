import { cpf, cnpj } from 'cpf-cnpj-validator';


class Validations {
    static validateCpfCnpj(value) {
        const cleanedValue = value.replace(/\D/g, ""); 
        if (cleanedValue.length === 11) {
            return cpf.isValid(cleanedValue); 
        } else if (cleanedValue.length === 14) {
            return cnpj.isValid(cleanedValue); 
        }
        return false; 
    }
}

export default Validations;