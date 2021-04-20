const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendCode = async(req, res) => {
    const number = req.query['number'];
    client.verify.services('VA54bd3347502d0946757aaf6e77feb6ba')
        .verifications
        .create({ to: `+1${number}`, channel: 'sms' })
        .then((verification_status) => res.send(verification_status))
        .catch((err) => res.status(400).send(err))
}

exports.checkCode = async(req, res) => {
    const number = req.query['number'];
    const code = req.query['code'];
    client.verify
        .services('VA54bd3347502d0946757aaf6e77feb6ba')
        .verificationChecks
        .create({ to: `+1${number}`, code })
        .then((verification_check) => res.send(verification_check.status))
        .catch((err) => res.status(400).send(err))
}