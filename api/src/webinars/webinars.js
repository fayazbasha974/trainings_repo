const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');
const { v4: uuid } = require('uuid'); 
const tableName = process.env.WEBINARS_TABLE;

router.post('/save', verifyToken, async (req, res) => {
    const item = req.body;
    if (!item.id) {
        item.id = uuid();
    }
    const webinarImage = await queries.uploadToS3(req.body.thumbnailImage);
    const authorImage = await queries.uploadToS3(req.body.authorImage);
    item.webinarImageUrl = webinarImage.url;
    item.authorImageUrl = authorImage.url;
    delete item.thumbnailImage;
    delete item.authorImage;
    const params = {
        TableName: tableName,
        Item: item
    };
    try {
        const result = await queries.put(params);
        if (result) {
            res.json(result);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName,
        Key: {
            id: req.params.id
        }
    };
    try {
        const result = await queries.deleteItem(params);
        if (result) {
            res.json({message: 'Deleted Successfully'});
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/get', async (req, res) => {
    const params = {
        TableName: tableName
    };
    try {
        const result = await queries.scan(params);
        if (result) {
            res.json(result.Items);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/get/:filterType/:filterValue', async (req, res) => {
    const filterType = req.params.filterType, params = {
        TableName: tableName,
        FilterExpression: `${filterType} = :filter`,
        ExpressionAttributeValues: {
            ':filter': req.params.filterValue
        }
    };
    try {
        const result = await queries.scan(params);
        if (result) {
            res.json(result.Items);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;