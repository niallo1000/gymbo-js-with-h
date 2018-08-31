'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const gym = require('../utils/gym');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentMember(request);
 
    const viewData = {
      title: 'Member Dashboardsss',
      members: memberStore.getMember(loggedInUser.id),
      bmi:  gym.bmi(loggedInUser),
      idealweight: gym.idealweight(loggedInUser),

    };
    logger.info('about to render', memberStore.getMember(loggedInUser.id));
    response.render('dashboard', viewData);
  },
  
    memberAssessment(request, response){
    const memberid = request.params.id;
    const loggedInUser = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    const member = memberStore.getAssessment(assessmentId);  
    const viewData = {
    assessment: member.assessments,
    member : member,
    title: 'Member Dashboard',
    members: memberStore.getMember(loggedInUser.id),  
    };
    response.render('listassessments', viewData); 
 
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

  
   

};

module.exports = dashboard;