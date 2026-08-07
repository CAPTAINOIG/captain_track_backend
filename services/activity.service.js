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

  async getActivityStats(userId) {
    const activities = await Activity.find({ userId }).sort({ date: -1 });
    if (!activities || activities.length === 0) {
      return {
        totalDistance: 0,
        totalRuns: 0,
        totalTime: 0,
        avgPace: 0,
        caloriesBurned: 0,
        weeklyData: [],
        monthlyData: []
      };
    }
    const totalDistance = activities.reduce((sum, act) => sum + (act.distance || 0), 0);
    const totalRuns = activities.length;
    const totalTime = activities.reduce((sum, act) => sum + (act.duration || 0), 0);
    const totalCalories = activities.reduce((sum, act) => sum + (act.calories || 0), 0);
    const avgPace = totalRuns > 0 ? activities.reduce((sum, act) => sum + (act.pace || 0), 0) / totalRuns : 0;
    const weeklyMap = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      weeklyMap[dayName] = 0;
    }

    activities.forEach(act => {
      const actDate = new Date(act.date);
      const dayName = days[actDate.getDay()];
      if (weeklyMap.hasOwnProperty(dayName)) {
        weeklyMap[dayName] += act.distance || 0;
      }
    });

    const weeklyData = Object.entries(weeklyMap).map(([day, distance]) => ({
      day,
      distance: parseFloat(distance.toFixed(2))
    }));

    const monthlyMap = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = monthNames[date.getMonth()];
      monthlyMap[monthName] = 0;
    }

    activities.forEach(act => {
      const actDate = new Date(act.date);
      const monthName = monthNames[actDate.getMonth()];
      if (monthlyMap.hasOwnProperty(monthName)) {
        monthlyMap[monthName] += act.distance || 0;
      }
    });

    const monthlyData = Object.entries(monthlyMap).map(([month, distance]) => ({
      month,
      distance: parseFloat(distance.toFixed(2))
    }));

    return {
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      totalRuns,
      totalTime,
      avgPace: parseFloat(avgPace.toFixed(2)),
      caloriesBurned: parseFloat(totalCalories.toFixed(2)),
      weeklyData,
      monthlyData
    };
  }
}

module.exports = new ActivityService();
