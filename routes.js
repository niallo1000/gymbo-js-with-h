'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const member = require('./controllers/member.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/trainerlogin', accounts.trainerlogin);

router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/authenticatetrainer', accounts.authenticatetrainer);
router.get('/updatereg/', accounts.updatereg);

router.get('/dashboard', dashboard.index);
router.get('/trainerdashboard', trainerdashboard.index);

router.get('/trainerdashboard/deletemember/:id', trainerdashboard.deleteMember);
router.post('/dashboard/addmember', dashboard.addMember);

router.get('/about', about.index);
router.get('/member/:id', member.index);
router.get('/member/:id/deleteassessment/:assessmentid', member.deleteAssessment);

router.post('/member/:id/addassessment', member.addAssessment);
router.post('/editcomment/:id', trainerdashboard.editComment);
router.get('/trainerdashboard/:id', trainerdashboard.trainerAssessment);
router.get('/dashboard/:id', dashboard.memberAssessment);


module.exports = router;
