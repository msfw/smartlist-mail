const { resolve } = require('path')
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const rabbitSubscriber = require('./modules/rabbit/subcriber/SubscriberBase')
const mailer = require('./modules/mailer')
const emailQueue = require('./config/queue')

rabbitSubscriber([emailQueue], (message) => {
    const messageObject = JSON.parse(message)

    if (message !== '')
        mailer.sendMail({
            from: 'noreply.smartlist@gmail.com',
            to: messageObject.to,
            subject: messageObject.subject,
            template: messageObject.template,
            context: messageObject.context
        }).catch(err => console.log(err))
    
})
