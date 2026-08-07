const express = require('express');
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  getActivityStats
} = require('../controllers/activity.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.use(auth);

router.post('/activities', createActivity);
router.get('/activities/stats', getActivityStats);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivity);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

module.exports = router;
