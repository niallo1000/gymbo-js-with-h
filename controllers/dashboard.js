'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberstore = require('../models/member-store');
const uuid = require('uuid');
const gym = require('../utils/gym');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentMember(request); 
    const viewData = {
      title: 'Member Dashboardsss',
      members: memberstore.getMember(loggedInUser.id),
      bmi:  gym.bmi(loggedInUser),
      idealweight: gym.idealweight(loggedInUser),
    };
    logger.info('about to render', memberstore.getMember(loggedInUser.id));
    response.render('dashboard', viewData);
     }, 
     
  };

module.exports = dashboard;