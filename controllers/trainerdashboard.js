'use strict';

const accounts = require ('./accounts.js');
const _ = require('lodash');
//const moment = require('moment');
const logger = require('../utils/logger');
const trainerstore = require('../models/trainer-store');
const memberstore = require('../models/member-store');
const gym = require('../utils/gym');
const uuid = require('uuid');


const trainerdashboard = {
  index(request, response) {
    logger.info('trainerdashboard rendering');  
    let trainer = request.cookies.trainer;
    let member = memberstore.getAllMembers();
    response.cookie('member', member.id);
    const viewData = {
      title: 'Trainer Dashboard',
      member: member,
      trainer: trainer,

    };
  
    response.render('trainerdashboard', viewData);

  },

  trainerAssessment(request, response){
    const memberid = request.params.id;
    const member = memberstore.getMemberById(memberid);
   const name = memberstore.getMemberByName(memberid);
    response.cookie('member', member.id);
    let trainer = request.cookies.trainer;
  //  let add =   "";
  //  let list = "updateassessment";    
    const viewData = {
      assessment: member.assessments,
      member : member,
      trainer:trainer,
      bmi:  gym.bmi(member),
      idealweight:  gym.idealweight(member),
      name:  name
 
    };
    response.render('trainerassessment', viewData); 
 
  },


  deleteMember(request, response){
    const memberId = request.params.id;
    logger.debug('Removing Member Id = ', memberId) 
    memberstore.removeMember(memberId),
    response.redirect('/trainerdashboard'); 



  },

  editComment(request,response){
    const memberId = request.cookies.member;
    const member = memberstore.getMemberById(memberId);

    const assessment = memberstore.getAssessment(request.params.id);
    const assessmentid = request.params.id;
    const comment = request.body.comment;

    logger.debug('Add Comment to Assessment', comment);
    memberstore.addComment(assessmentid,memberId, comment);
    response.redirect('/trainerdashboard');
  },


};


module.exports = trainerdashboard;






// const gymutil = require('../utils/gymutility');
//const assessmentStore = require('../models/assessment-store');
//const moment = require('moment');

// trainerAssessment
 //     bmi:  gymutil.bmi(member),
  //    idealweight: gymutil.idealweight(member),