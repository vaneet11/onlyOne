const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes')

const port = 8888
const app = express()
const { Client } = require('pg')


app.use(helmet());
app.use(cors());
app.use(bodyParser.json())

app.use(express.json());

// app.use(cors());

// app.use(morgan('combined'));

app.use('/', routes)


// const client = new Client({
//     host: 'localhost',
//     port: '5432',
//     user: 'postgres',
//     password: 'instep',
// })

// client.connect().then(() => console.log('Connected to Postgres DB'));

// app.get('/', function (req, res) {
//     res.send('hello World');
// })

// app.get('/list', function (req, res) {
//     res.send(ads);
// })

app.listen(port, () => {
    console.log(` >> Listening to port ${port}`)
})
