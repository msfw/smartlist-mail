const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars');
const EmailTemplate = require('email-templates').EmailTemplate
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

module.exports = (mail) => {
    const sendMail = transporter.templateSender(new EmailTemplate(path.resolve(__dirname, `../templates/${mail.template}`)),
     { from: 'noreply.smartlist@gmail.com' })

    sendMail({
        to: mail.to,
        subject: mail.subject
    }, mail.context, (err) => {
        if (err)
            console.log("ERRO", err)
        else
            console.log("SENT")
    })
}

// const templateDirectory = path.resolve(__dirname, '../templates/')

// transporter.use('compile', hbs({
//     viewEngine: exphbs.create({
//         layoutsDir: templateDirectory,
//         partialsDir: templateDirectory,
//         defaultLayout: 'default',
//         extname: '.hbs'
//     }),
//     viewPath: templateDirectory,
//     extName: '.hbs'
// }));

// aplicar template depois.

// module.exports = transporter;