export class FormValidation {

    #formData;
    #formValidation;
    #is_valid = true;

    constructor(formData, formValidation) {
        this.#formData = formData;
        this.#formValidation = formValidation;
    }

    exec() {

        for (let field in this.#formData) {
            if (this.#formData[field].length === 0) {
                this.#formValidation[field] = {
                    error: true,
                    message: `Inform the ${field}`
                }
                this.#is_valid = false;
            } else if (this.#formData[field].length > 0) {
                this.#formValidation[field] = {
                    error: false,
                    message: ""
                }
            }
        }

        return {
            validation: this.#formValidation,
            is_valid: this.#is_valid
        };

    }

}