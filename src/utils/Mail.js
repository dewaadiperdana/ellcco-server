import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';

dotenv.config();

class Mail {
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
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    };

    this.transport = nodemailer.createTransport(sgTransport(this.sendGrid));
    this.transport.use('compile', hbs(this.options));
  }

  async send(from, to, subject, template, data = {}) {
    this.transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      template: template,
      context: data
    }, (error, response) => {
      if (error) {
        throw error;
      }

      this.transport.close();
      return Promise.resolve(response);
    });
  }
}

export default Mail;