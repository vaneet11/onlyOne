


TWILIO_ACCOUNT_SID = 'AC65337ab43a1aa39a539125b14d455e8b'
TWILIO_AUTH_TOKEN = '74d4ef751f7968f3d2044395065dcee4'
TWILIO_API_KEY = 'SK01338df3259a297ba64201fb14e8879c'
TWILIO_API_SECRET = 'sHqvH7YtGFET7nIRhnd4f1jJ0djbdpDd'
TWILIO_CHAT_SERVICE_SID = 'IS0879efe27d3b4f3c9b3a96cbdc8339cb'

const express = require('express');
const accountSid = "AC65337ab43a1aa39a539125b14d455e8b";
const authToken = "74d4ef751f7968f3d2044395065dcee4";
const conversationSid = 'CH4862368e3bcc491abf8c34ce7b044b9c'
const chatserviceSid = "IS0879efe27d3b4f3c9b3a96cbdc8339cb"
const client = require('twilio')(accountSid, authToken);

const router = express.Router()

const ads = [
    { title: 'Hello, world (again)!' }
];

const createMessages = async function (req, res) {
    console.log(req.body, 'atrbiute')
    client.conversations.v1.conversations
        .create({ friendlyName: req.body.name, attributes: JSON.stringify(req.body.attribute) })
        .then(conversation => {
            res.send(conversation)
            console.log(conversation.sid)
        });
};

const fetchmessage = async function (req, res) {
    client.conversations.v1.conversations(req.body.sid)
        .fetch()
        .then(conversation => {
            res.send(conversation)
            console.log(JSON.parse(conversation.attributes).name, 'atrributes')
        })
}

const addparticipant = async function (req, res) {
    client.conversations.v1.conversations(req.body.sid)
        .participants
        .create({ identity: req.body.identity })
        .then(participant => {
            res.send(participant)
            console.log(participant.sid)
        });
}


const update = async function (req, res) {
    client.conversations.v1.conversations(req.body.sid)
        .update({ attributes: JSON.stringify(req.body.attribute) })
        .then(conversation => {
            res.send(conversation)
            console.log(conversation.attributes)
        });
}

const webhook = async function (req, res) {
    console.log(req, res, 'ressssssssssss')
}
router.post('/create', createMessages)
router.post('/fetch', fetchmessage)
router.post('/addParticipant', addparticipant)
router.post('/update', update)
router.post('/webhook', webhook)


module.exports = router