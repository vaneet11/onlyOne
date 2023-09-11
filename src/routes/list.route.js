const express = require('express');


const router = express.Router()

const ads = [
    { title: 'Hello, world (again)!' }
];
router.get('/', (req, res) => res.send(ads))

module.exports = router