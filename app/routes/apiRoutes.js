const express = require('express');
const friendsData = require('../data/friends');

const router = express.Router();

router.get('/friends', (req, res, next) => {
    return res.json(friendsData);
});

module.exports = router;