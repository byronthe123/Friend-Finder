const express = require('express');
const questions = require('../data/questions');
const friends = require('../data/friends');

const router = express.Router();

// -------------------------------------------------- Helper Methods -------------------------------------------------- 
const getProperties = (friend) => {
    let toReturn = {};
    const getValues = ['name', 'photo'];
    for(let key in friend) {
        if(getValues.indexOf(key) !== -1) {
            toReturn[key] = friend[key];
        }
    }
    return toReturn;
}

const compatibilityAlgorithm = (userScores, friends) => {
    let mostCompatibleFriend;
    let initial = true;
    let difference = 0;
    for(let i = 0; i < friends.length; i++) {
        let controlDifference = 0;
        for(let j = 0; j < friends[i].scores.length; j++) {
            // console.log('friends score: ' + parseInt(friends[i].scores[j]));
            // console.log('user score: ' + parseInt(userScores[j]));
            controlDifference += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j]));
        }
        // console.log(`Friend: ${friends[i].name} and Difference: ${controlDifference}`);
        if(initial) {
            difference = controlDifference;
            mostCompatibleFriend = getProperties(friends[i]);
            initial = false;
        } else {
            if(controlDifference < difference) {
                difference = controlDifference;
                mostCompatibleFriend = getProperties(friends[i]);
            }
        }   
    }
    return mostCompatibleFriend;
    // console.log(difference);
    // console.log(mostCompatibleFriend);
}

// -------------------------------------------------- Routes -------------------------------------------------- 
router.get('/', (req, res, next) => {
    return res.render('index');
});

router.get('/survey', (req, res, next) => {
    res.render('survey', {surveyQs: questions});
});

router.post('/survey', (req, res, next) => {
    let userScores = [];
    console.log(req.body);
    for(let key in req.body) {
        userScores.push(parseInt(req.body[key]));
    }
    const mostCompatibleFriend = compatibilityAlgorithm(userScores, friends);
    console.log(`In survery:\n`);
    console.log(mostCompatibleFriend);
    res.json(mostCompatibleFriend);
});

module.exports = router;