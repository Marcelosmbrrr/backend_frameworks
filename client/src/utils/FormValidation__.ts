interface Schema {
    [field: string]: string[] //Refact: string[] to type Rules<T extends string> = ["required", `min:${T}`, "email"];
}

interface FormData {
    [filed: string]: string
}

interface ValidationSchema {
    [filed: string]: {
        error: boolean;
        message: string;
    }
}

export class FormValidation {

    #schema: Schema;
    #validation = {};

    constructor(schema: Schema, validationSchema: ValidationSchema) {
        this.#schema = schema;
        this.#validation = validationSchema;
    }

    exec(formData: FormData) {

        for (let form_field in formData) {
            for (let schema_field in this.#schema) {

                if (form_field === schema_field) {

                    const field_rules = this.#schema[form_field];

                    field_rules.map((rule, index) => {

                        let is_valid = true;
                        let messages = [];
                        let rule_validation = null;

                        if (rule === "required") {

                            rule_validation = this.#required(form_field, formData[form_field]);

                        } else if (rule === "email") {

                            rule_validation = this.#email(formData[form_field]);

                        } else {

                            const split = rule.split(":");
                            const name: string = split[0];
                            const factor: number = Number(split[1]);

                            if (name === "min") {
                                rule_validation = this.#min(form_field, formData[form_field], factor);
                            } else if (name === "max") {
                                rule_validation = this.#max(form_field, formData[form_field], factor);
                            }

                        }

                        if (rule_validation != null) {
                            is_valid = false;
                            messages.push(rule_validation);
                            this.#validation[form_field] = {
                                error: true,
                                message: messages
                            }
                        }

                    });

                }
            }
        }

        return this.#validation;

    }

    #required(field: string, value: string): string | null {
        if (value.length > 0) {
            return null;
        } else {
            return field + " is required.";
        }
    }

    #min(field: string, value: string, factor: number): string | null {
        if (value.length >= factor) {
            return null;
        } else {
            return field + " must have " + factor + "characters or more.";
        }
    }

    #max(field: string, value: string, factor: number): string | null {
        if (value.length <= factor) {
            return null;
        } else {
            return field + " must have " + factor + "characters or less.";
        }
    }

    #email(value: string): string | null {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return null;
        } else {
            return "Invalid email address";
        }
    }

}