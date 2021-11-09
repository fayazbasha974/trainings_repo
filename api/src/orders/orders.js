const router = require('express').Router();
const {verifyToken} = require('../jwt/jwt');
const queries = require('../dbmethods/dbqueries');
const { v4: uuid } = require('uuid');

const ordersTable = process.env.ORDERS_TABLE;

router.post('/', verifyToken, async (req, res) => {
    const params = {
        TableName: ordersTable,
        Item: {
            id: uuid(),
            customer: req.decoded.username,
            
        }
    };
    try {

    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;