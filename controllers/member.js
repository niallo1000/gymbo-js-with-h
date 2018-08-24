'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

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
    const memberId = request.params.id;
    const loggedInUser = accounts.getCurrentMember(request);
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips, 
      username: loggedInUser.name,
    };
    logger.debug('New Assessment = ', newAssessment);
   memberStore.addAssessment(loggedInUser.id, newAssessment);
  // memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/dashboard');
 //   response.redirect('/member/' + memberId);
  },
};

module.exports = member;
