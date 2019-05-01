import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import sgTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv';

dotenv.config();

export default class Mail {
  constructor() {
    this.options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: __dirname + '/../src/views/layouts/',
        defaultLayout: 'email',
        partialsDir: __dirname + '/../src/views/partrials/'
      },
      viewPath: __dirname + '/../src/views/emails',
      extName: '.hbs'
    };

    this.sendGrid = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    };

    this.transport = nodemailer.createTransport(sgTransport(this.sendGrid));
    this.transport.use('compile', hbs(this.options));
  }

  async send(from, to, subject, template, data = {}) {
    return new Promise((resolve, reject) => {
      this.transport.sendMail({
        from: from,
        to: to,
        subject: subject,
        template: template,
        context: data
      }, (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response);
        this.transport.close();
      });
    });
  }
}