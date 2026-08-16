const ChallengesService = require('../services/challenges.service');
const asyncHandler = require('../utils/asyncHandler');
const ResponseHandler = require('../utils/responseHandler');

const createChallenge = asyncHandler(async (req, res) => {
  const challenge = await ChallengesService.createChallenge(req.body, req.user._id);
  ResponseHandler.created(res, challenge, 'Challenge created successfully');
});

const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await ChallengesService.getChallenges(req.user._id);
  ResponseHandler.success(res, challenges, 'Challenges retrieved successfully');
});

const getChallengeById = asyncHandler(async (req, res) => {
  const challenge = await ChallengesService.getChallengeById(req.params.id, req.user._id);
  ResponseHandler.success(res, challenge, 'Challenge retrieved successfully');
});

const updateChallenge = asyncHandler(async (req, res) => {
  const challenge = await ChallengesService.updateChallenge(req.params.id, req.body, req.user._id);
  ResponseHandler.success(res, challenge, 'Challenge updated successfully');
});

const deleteChallenge = asyncHandler(async (req, res) => {
  await ChallengesService.deleteChallenge(req.params.id, req.user._id);
  ResponseHandler.success(res, null, 'Challenge deleted successfully');
});

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge
};
