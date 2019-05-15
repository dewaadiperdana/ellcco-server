import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';

dotenv.config();

export default class Mail {
  constructor() {
    this.options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: __dirname + '/../views/layouts/',
        defaultLayout: 'email',
        partialsDir: __dirname + '/../views/partrials/'
      },
      viewPath: __dirname + '/../views/emails',
      extName: '.hbs'
    };

    this.sendGrid = {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    };

    this.transport = nodemailer.createTransport(this.sendGrid);
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
          console.log(error);
        }

        resolve(response);
        this.transport.close();
      });
    });
  }
}