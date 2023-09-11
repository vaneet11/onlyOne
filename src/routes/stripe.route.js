const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()
const stripe = require('stripe')('sk_test_51NdHDAHFIEFD9veUSdXlFE0qR1DLDMwHwDBg95BoE5XKVesy1U5kvfxITmzs6ExAibdnvTrJTkCJyKlH6eCVxNtv00ERoGVIAB')

const createCustomer = async (req, res) => {
    try {
        const { name, email, customerId } = req.body
        console.log(req.body)
        const newCustomer = await stripe.customers.create({
            name: name,
            email: email
        })
        let result = { success: true, params: req.body, customerID: newCustomer.id, newCustomer }
        res.status(200).send(result)
    }
    catch (error) {
        console.log('Error>>', error.message)
    }
}

const createSetupintent = async (req, res) => {
    try {
        const { customerId } = req.body
        const setupIntent = await stripe.setupIntents.create({
            customer: customerId,
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
        })

        let result = { success: true, params: req.body, stripeIntent: setupIntent, clientSecret: setupIntent.client_secret }

        res.status(200).send(result)
    }
    catch (error) {
        console.log('Error>>', error.message)

    }
}

const confirmSetupintent = async (req, res) => {
    try {
        const { intentId, paymentToken, data } = req.body
        const setupIntent = await stripe.setupIntents.update(intentId, {
            payment_method: paymentToken
        })

        const confirm = await stripe.setupIntents.confirm(intentId)
        const updateCustomerPaymentMethod = await stripe.customers.update(data.customer, {
            invoice_settings: {
                default_payment_method: paymentToken
            }
        })
        let result = { success: true, params: req.body, update: updateCustomerPaymentMethod, stripeIntent: setupIntent, status: confirm.status, clientSecret: setupIntent.client_secret }

        res.status(200).send(result)
    }
    catch (error) {
        console.log('Error>>', error.message)

    }
}

const getCustomer = async (req, res) => {
    try {
        const { id } = req.body
        const customer = await stripe.customers.retrieve(id)
        res.status(200).send(customer)
    }
    catch (error) {
        console.log("Error >>> ", error.message)
    }
}
const paymentIntent = async (req, res) => {
    try {
        const { id, amount } = req.body
        const customer = await stripe.customers.retrieve(id)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
            customer: id,
            payment_method: customer.invoice_settings.default_payment_method
        })

        const confirm = await stripe.paymentIntents.confirm(paymentIntent.id)
        let result = { success: true, customer: customer, intent: paymentIntent, confirm: confirm }
        res.status(200).send(result)
    }
    catch (error) {
        console.log("Error >>> ", error.message)
    }
}

const getBalance = async (req, res) => {
    try {
        
     }
    catch (error) {
        console.log("Error :>> ", error.message)
    }
}
router.post('/createCustomer', createCustomer)
router.post('/getCustomer', getCustomer)
router.post('/getBalance', getBalance)
router.post('/createSetupintent', createSetupintent)
router.post('/confirmSetupintent', confirmSetupintent)
router.post('/paymentIntent', paymentIntent)


module.exports = router