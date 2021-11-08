const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');
const AWS = require("aws-sdk");

const tableName = process.env.USER_TABLE;
const webinarTable = process.env.WEBINARS_TABLE;

router.post('/:webinarid', verifyToken, async (req, res) => {
    const cart = [
        {
            id: req.params.webinarid,
            paymentFor: req.body.paymentFor
        }
    ];
    const params = {
        TableName: tableName,
        Key: {
            username: req.decoded.username
        },
        "UpdateExpression": "set cart = list_append (cart, :cart)",
        "ExpressionAttributeValues": {
            ":cart" : cart
        },
        "ReturnValues" : "UPDATED_NEW"
    };
    try {
        const result = await queries.update(params);
        res.json(result);
    } catch(error) {
        res.status(500).json(error); 
    }
});

router.get('/', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName,
        Key: {
            username: req.decoded.username
        }
    }
    try {
        const result = await queries.scan(params);
        const user = result.Items[0];
        if (user && user.cart && user.cart.length) {
            const webinarIds = {}, paymentOptions = {};
            user.cart.map((value, index) => {
                var titleKey = ":titlevalue"+index;
                webinarIds[titleKey.toString()] = value.id;
                paymentOptions[value.id] = value.paymentFor;
            });
            const webinarParams = {
                TableName: webinarTable,
                FilterExpression: "id IN ("+Object.keys(webinarIds).toString()+ ")",
                ExpressionAttributeValues : webinarIds
            };
            try {
                const webinars = await queries.scan(webinarParams);
                res.json({
                    Items: webinars.Items,
                    paymentOptions
                });
            } catch(error) {
                res.status(500).json(error);
            }
        } else {
            res.json({
                Items: [],
                paymentOptions: {}
            });
        }
    } catch(error) {
        res.status(500).json(error); 
    }
});

module.exports = router;
