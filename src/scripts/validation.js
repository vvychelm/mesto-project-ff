const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const { inputErrorClass, errorClass } = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const { inputErrorClass, errorClass } = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    const { inactiveButtonClass } = validationConfig;
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const { inputSelector, submitButtonSelector } = validationConfig
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputs, submitButton, validationConfig);

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputs, submitButton, validationConfig);
        });
    });
};

const enableValidation = (validationConfig) => {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
};

const clearValidation = (formElement, validationConfig) => {
    const { inputSelector, submitButtonSelector, inactiveButtonClass } = validationConfig;
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    inputs.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });

    submitButton.classList.add(inactiveButtonClass);
};

export { enableValidation, clearValidation };