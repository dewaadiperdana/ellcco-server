export default class Response {
  static success(response, code, message, data = null) {
    return response.status(code).json({
      type: 'success',
      message: message,
      data: data
    });
  }

  static error(response, code, message, data = null) {
    return response.status(code).json({
      type: 'error',
      message: message,
      data: data
    });
  }
}