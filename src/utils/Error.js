class Error {
  static formatFormValidationError(errors) {
    let formattedErrors = {};

    for(let error in errors) {
      formattedErrors = {
        ...formattedErrors,
        [errors[error].param]: {
          key: errors[error].param,
          message: errors[error].msg
        }
      };
    }

    return formattedErrors;
  }
}

export default Error;