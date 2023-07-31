import { useCallback, useState } from "react";

export default function useFormValidation() {
    const [isValid, setIsValid] = useState(false);
    const [isInputValid, setIsInputValid] = useState({});
    const [isValues, setIsValues] = useState({});
    const [isError, setIsError] = useState({});

    const setValue = useCallback((nameInput, valueInput) => {
        setIsValues((valuesInput) => {
            return { ...valuesInput, [nameInput]: valueInput }
        });
    }, []);

    function resetInput(data={}) {
        setIsValues(data);
        setIsError({});
        setIsValid(false);
        setIsInputValid({});
    };

    function handleInputChange(evt) {
        const form = evt.target.form;
        const nameInput = evt.target.name;
        const valueInput = evt.target.value;
        const validationMessage = evt.target.validationMessage;
        const validInput = evt.target.validity.valid;

        setIsValues((valuesInput) => {
            return { ...valuesInput, [nameInput]: valueInput }
        });

        setIsInputValid((inputValid) => {
            return { ...inputValid, [nameInput]: validInput }
        });

        setIsError((errorsInput) => {
            return { ...errorsInput, [nameInput]: validationMessage }
        });

        setIsValid(form.checkValidity());
    };

    return { isValues, isError, isValid, isInputValid, handleInputChange, resetInput, setValue }
}; 