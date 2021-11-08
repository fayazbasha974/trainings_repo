const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { verifyToken } = require('../jwt/jwt');
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
            const params = {
                TableName: userTableName,
                Key: {
                    username: req.decoded.username
                },
                "UpdateExpression": "set orders = list_append (orders, cart),  cart = :emptyCart",
                "ExpressionAttributeValues": {
                    ":emptyCart": []
                },
                "ReturnValues": "UPDATED_NEW"
            };
            try {
                const result = await queries.update(params);
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