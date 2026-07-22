const express = require('express');
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activity.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.use(auth);

router.post('/activities', createActivity);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivity);
router.put('/activities/:id', updateActivity);
router.delete('/:id', deleteActivity);

module.exports = router;
