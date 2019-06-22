class Error {
  constructor(errors) {
    this.errors = errors;
  }

  has(key) {
    return key in this.errors;
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    }

    return this.errors[key];
  }

  message(key) {
    if (!this.has(key)) {
      return null;
    }

    return this.errors[key].message;
  }

  delete(key) {
    delete this.errors[key];
  }

  clear() {
    this.errors = null;
  }
}

export default Error;
