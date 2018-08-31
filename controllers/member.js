'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const moment = require('moment');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('member id = ', memberId);
    const viewData = {
      title: 'member',
      member: memberStore.getMember(memberId),
    };
    response.render('member', viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect('/member/' + memberId);
  },
  


  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentMember(request);
    const assessment = loggedInUser.assessments;
   
    let trend = false;

    if (assessment.length > 1){
      trend = assessment[0].weight > request.body.weight;
      console.log(trend)
    }

   
    const newAssessment = {
      id: uuid(),
      memberid: loggedInUser.id,
      username: loggedInUser.name,
     date:  moment().format('DD MMM YYYY, h:mm:ss a'),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: trend,
      comments: "",
    };
    logger.debug('Creating a new Assessment', newAssessment);
    memberStore.addAssessment(loggedInUser.id, newAssessment);
    response.redirect('/dashboard');
  },
};

module.exports = member;