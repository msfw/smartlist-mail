const { resolve } = require('path')
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const rabbitSubscriber = require('./modules/rabbit/subcriber/SubscriberBase')
const send = require('./modules/mailer')
const emailQueue = require('./config/queue')

rabbitSubscriber([emailQueue], (message) => {
    console.log("RECEBEU",message)
    const messageObject = JSON.parse(message)

    if (message !== '')
        send(messageObject)    
})
