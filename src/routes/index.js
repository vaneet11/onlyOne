const express = require('express');
const listRoutes = require('./list.route')
const twilioRoutes = require('./twilio.route')
const stripeRoutes = require('./stripe.route')
const defaultRoute = require('./default.route')

const router = express.Router()
const indexRoutes = [
    { path: '/', route: defaultRoute },
    { path: '/list', route: listRoutes },
    { path: '/twilio', route: twilioRoutes },
    { path: '/stripe', route: stripeRoutes },
]

indexRoutes.forEach((route) => {
    // console.log(route, 'aaaaaaaaaa')
    router.use(route.path, route.route)
})

module.exports = router