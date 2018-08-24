'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Member Dashboard',
      members: memberStore.getMember(loggedInUser.id),

    };
    logger.info('about to render', memberStore.getMember(loggedInUser.id));
    response.render('dashboard', viewData);
  },

  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard');
  },

  addMember(request, response) {
    const loggedInUser = accounts.getCurrentMember(request);
    const newMember = {
      id: uuid(),
      memberid: loggedInUser.id,
      name: request.body.name,
      assessments: [],
    };
    logger.debug('Creating a new Member', newMember);
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
  },
    addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug('New Assessment = ', newAssessment);
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
  
   

};

module.exports = dashboard;
