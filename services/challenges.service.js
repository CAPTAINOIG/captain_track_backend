const Challenges = require('../models/challenges.model')

class ChallengesService {
  async createChallenge(challengeData, userId) {
    const challenge = await Challenges.create({ ...challengeData, userId });
    return challenge;
  }

  async getChallenges(userId) {
    const challenges = await Challenges.find({ userId }).sort({ date: -1 });
    return challenges;
  }

  async getChallengeById(id, userId) {
    const challenge = await Challenges.findOne({ _id: id, userId });
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    return challenge;
  }

  async updateChallenge(id, updateData, userId) {
    const challenge = await Challenges.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
    if (!challenge) {
      throw new Error('Challenge not found');   
    }
    return challenge;
  }

  async deleteChallenge(id, userId) {
    const challenge = await Challenges.findOneAndDelete({ _id: id, userId });
    if (!challenge) {
      throw new Error('Challenge not found');   
    }
    return challenge;
  }
}

module.exports = new ChallengesService();