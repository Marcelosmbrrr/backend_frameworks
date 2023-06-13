interface IFormData {
    [field: string]: any
}

interface IFormError {
    [field: string]: {
        error: boolean;
        message: string;
    }
}

export function FormValidation(formData: IFormData, formError: IFormError) {

    let is_valid = true;

    for (let field in formData) {
        if (formData[field].length === 0 || formData[field] === null) {
            formError[field] = {
                error: true,
                message: `Inform the ${field}`
            }
            is_valid = false;
        } else if (formData[field].length > 0) {
            formError[field] = {
                error: false,
                message: ""
            }
        }
    }

    return {
        validation: formError,
        is_valid: is_valid
    };


}