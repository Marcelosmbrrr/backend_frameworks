export type FormData<REF> = {
    [KEY in keyof REF]: REF[KEY]
};

export type FormDataError<REF> = {
    [KEY in keyof REF]: {
        error: boolean,
        message: string
    }
}