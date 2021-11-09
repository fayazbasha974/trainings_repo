const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { verifyToken } = require('../jwt/jwt');
const {updateOrderDetails} = require('../controllers/controller');
const queries = require('../dbmethods/dbqueries');

const userTableName = process.env.USER_TABLE;

router.post('/', verifyToken, (req, res) => {
    const stripePayload = {
        amount: req.body.amount * 100,
        currency: 'INR',
        description: 'payment',
        source: req.body.token
    };
    stripe.charges.create(stripePayload, async (err, charge) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const response = {
                message: 'payment successful',
                charge
            };
            try {
                const paramsForOrderUpdate = {
                    username: req.decoded.username,
                    amount: req.body.amount,
                    webinarIds: req.body.webinarIds
                }
                const result = await updateOrderDetails(paramsForOrderUpdate);
                console.log(result);
                res.json({
                    response, result
                });
            } catch (error) {
                console.log('error', error);
                res.status(500).json(error);
            }
        }
    })
});

module.exports = router;