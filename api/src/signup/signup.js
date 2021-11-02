const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');

router.post('/:path', async (req, res) => {
    let table = '';
    switch(req.params.path) {
        case 'speaker': table = process.env.SPEAKER_TABLE;
        break;
        case 'user': table = process.env.USER_TABLE;
        break;
    }
    const params = {
        TableName: table,
        Item: req.body
    }
    try {
        const result = await queries.put(params);
        if (result) {
            res.json(result);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;