const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { verifyToken } = require('../jwt/jwt');

router.post('/', verifyToken, (req, res) => {
    const stripePayload = {
        amount: req.body.amount * 100,
        currency: 'INR',
        description: 'payment',
        source: req.body.token
    };
    stripe.charges.create(stripePayload, (err, charge) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const response = {
                message: 'payment successful',
                charge
            };
            res.json(response);
        }
    })
});

module.exports = router;