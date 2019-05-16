class ValidationError {
  static format(errors) {
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

export default ValidationError;