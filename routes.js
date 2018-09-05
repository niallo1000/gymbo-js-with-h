'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const member = require('./controllers/member.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');


router.get('/login', accounts.login);
router.get('/trainerlogin', accounts.trainerlogin);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/authenticatetrainer', accounts.authenticatetrainer);
router.post('/updatereg/', accounts.updatereg);

router.get('/', accounts.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);


router.get('/dashboard/deleteassessment/:assessmentid', member.deleteAssessment);
//router.get('/member/:id/deleteassessment/:assessmentid', member.deleteAssessment);
router.post('/member/:id/addassessment', member.addAssessment);
router.post('/member/:id/addgoal', member.addGoal);
router.get('/dashboard/deletegoal/:goalid', member.deleteGoal);


router.get('/trainerdashboard', trainerdashboard.index);
router.get('/trainerdashboard/:id', trainerdashboard.trainerAssessment);
router.post('/editcomment/:id', trainerdashboard.editComment);



module.exports = router;
