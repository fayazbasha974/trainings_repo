const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.USER_TABLE;

router.post('/:webinarid', verifyToken, async (req, res) => {
    // res.json(req.body);
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
    // const cart = JSON.stringify({
    //         id: req.params.webinarid,
    //         paymentFor: req.body.paymentFor
    //     });
    // const params = {
    //     TableName: tableName,
    //     Key: {
    //         username: req.decoded.username
    //     },
    //     "UpdateExpression": "ADD #cart :cart",
    //     "ExpressionAttributeNames": { "#cart" : "cart" },
    //     "ExpressionAttributeValues": {
    //         ":cart" : dynamoClient.createSet([cart])
    //     },
    //     "ReturnValues" : "UPDATED_NEW"
    // };
    try {
        const result = await queries.update(params);
        res.json(result);
    } catch(error) {
        res.status(500).json(error); 
    }
});

module.exports = router;
