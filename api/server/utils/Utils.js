export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  setError(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'error';
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    };

    return res.status(this.statusCode).json(result);
  }
}