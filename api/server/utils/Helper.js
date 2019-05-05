import dotenv from 'dotenv';

dotenv.config();

export default class Helper {
  static appUrl() {
    let url = '';

    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:3000/'
    } else if (process.env.NODE_ENV === 'production') {
      url = process.env.APP_URL
    }

    return url;
  }
}