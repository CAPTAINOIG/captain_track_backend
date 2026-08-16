const express = require('express')
const { createChallenge, updateChallenge, getChallengeById, getChallenges, deleteChallenge } = require('../services/challenges.service')

const router = express.Router();

router.post('/challenges', createChallenge);
router.get('/challenges', getChallenges);
router.get('/challenges/:id', getChallengeById);
router.put('/challenges/:id', updateChallenge)
router.delete('/challenges/:id', deleteChallenge)

module.exports = router;
