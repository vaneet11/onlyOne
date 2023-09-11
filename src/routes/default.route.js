const express = require('express');
const braintree = require("braintree");

const router = express.Router();


let BrainTree_merchantId = "4c2xzwscm5yc6zjr"
let BrainTree_PublicKey = "6zyy89tzzqn68cm5"
let BrainTree_PrivateKey = "be5236816732d1ddbd212c43e339aaeb"
router.get('/', (req, res) => res.send(200))
router.post('/checkout', (req, res) => {
    const paymentGateWay = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: BrainTree_merchantId,
        publicKey: BrainTree_PublicKey,
        privateKey: BrainTree_PrivateKey,
    })

    const paymentNonce = req.body?.nonce
    const newTransaction = paymentGateWay.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: paymentNonce,
    }, function (error, result) {
        if (result) {
            res.send(result)
        } else {
            res.status(500).send(error);
        }
    })
})

module.exports = router