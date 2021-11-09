const queries = require('../dbmethods/dbqueries');
const { v4: uuid } = require('uuid');

const userTableName = process.env.USER_TABLE;
const ordersTableName = process.env.ORDERS_TABLE;

const updateOrderDetails = (reqPayload) => {
    return new Promise(async (resolve, reject) => {
        const orderItem = {
            id: uuid(),
            customer: reqPayload.username,
            amount: reqPayload.amount,
            date: new Date().toISOString(),
            webinars: reqPayload.webinarIds
        }, userParams = {
            TableName: userTableName,
            Key: {
                username: reqPayload.username
            },
            "UpdateExpression": "set orders = list_append (orders, cart),  cart = :emptyCart",
            "ExpressionAttributeValues": {
                ":emptyCart": []
            },
            "ReturnValues": "UPDATED_NEW"
        }, ordersParams = {
            TableName: ordersTableName,
            Item: orderItem
        }
        try {
            await queries.update(userParams);
            await queries.put(ordersParams);
            const successMsg = {
                message: 'Succesfully Completed'
            }
            resolve(successMsg);
        } catch(error) {
            reject({message: 'Error while updating orders', error});
        }
    });
}

module.exports = {
    updateOrderDetails
}