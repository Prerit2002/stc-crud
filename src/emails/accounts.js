const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRIDAPIKEY)


const sendWelcome = (email, name) => {
    sgMail.send({
        to: email,
        from: 'prerit715@gmail.com',
        subject: 'Welcome',
        text: `Welcome to the app ${name}.Let me know how you get along`,
    })
}

const sendCancel = (email, name) => {
    sgMail.send({
        to: email,
        from: 'prerit715@gmail.com',
        subject: 'Reason for cancellation',
        text: `Welcome to the app ${name}.Let me know how you get along`,
    })
}


module.exports = {
    sendWelcome,
    sendCancel
}