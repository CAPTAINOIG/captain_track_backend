const Activity = require('../models/activities.model');

class ActivityService {
  async createActivity(activityData, userId) {
    const activity = await Activity.create({
      ...activityData,
      userId
    });
    return activity;
  }

  async getActivitiesByUser(userId) {
    const activities = await Activity.find({ userId }).sort({ date: -1 });
    return activities;
  }

  async getActivityById(id, userId) {
    const activity = await Activity.findOne({ _id: id, userId });
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }

  async updateActivity(id, updateData, userId) {
    const activity = await Activity.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }

  async deleteActivity(id, userId) {
    const activity = await Activity.findOneAndDelete({ _id: id, userId });
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }
}

module.exports = new ActivityService();
