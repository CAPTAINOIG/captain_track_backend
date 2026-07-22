const ActivityService = require('../services/activity.service');
const asyncHandler = require('../utils/asyncHandler');
const ResponseHandler = require('../utils/responseHandler');

const createActivity = asyncHandler(async (req, res) => {
  const activity = await ActivityService.createActivity(req.body, req.user._id);
  ResponseHandler.created(res, activity, 'Activity created successfully');
});

const getActivities = asyncHandler(async (req, res) => {
  const activities = await ActivityService.getActivitiesByUser(req.user._id);
  ResponseHandler.success(res, activities, 'Activities retrieved successfully');
});

const getActivity = asyncHandler(async (req, res) => {
  const activity = await ActivityService.getActivityById(req.params.id, req.user._id);
  ResponseHandler.success(res, activity, 'Activity retrieved successfully');
});

const updateActivity = asyncHandler(async (req, res) => {
  const activity = await ActivityService.updateActivity(req.params.id, req.body, req.user._id);
  ResponseHandler.success(res, activity, 'Activity updated successfully');
});

const deleteActivity = asyncHandler(async (req, res) => {
  await ActivityService.deleteActivity(req.params.id, req.user._id);
  ResponseHandler.success(res, null, 'Activity deleted successfully');
});

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity
};
