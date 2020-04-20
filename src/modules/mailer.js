const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require ('express-handlebars');
const path = require('path')

const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: false,
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

const templateDirectory = path.resolve(__dirname, '../templates')

transporter.use('compile', hbs({
    viewEngine: exphbs.create({
        layoutsDir: templateDirectory,
        partialsDir: templateDirectory,
        defaultLayout: 'default',
        extname: '.hbs'    
    }),
    viewPath: templateDirectory,
    extName: '.hbs'
}));

// aplicar template depois.

module.exports = transporter;