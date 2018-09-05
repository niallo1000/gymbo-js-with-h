'use strict';

const logger = require('../utils/logger');
const memberstore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const moment = require('moment');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('member id = ', memberId);
    const viewData = {
      title: 'member',
      member: memberstore.getMember(memberId),
    };
    response.render('member', viewData);
  },

  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentMember(request);
  //  const assessmentId = request.params.id;
    			const assessmentId = request.params.assessmentId; 
    
    logger.debug(`Deleting Assessment ${assessmentId} from member ${loggedInUser.id}`);
       logger.debug('paramid',request.params.assessmentId); 
    memberstore.removeAssessment(loggedInUser.id, assessmentId);
   response.redirect('/dashboard');
  }, 
  
      deleteGoal(request, response) {
    const loggedInUser = accounts.getCurrentMember(request);
    const goalId = request.params.id;    
    logger.debug(`Deleting Goal ${goalId} from member ${loggedInUser.id}`);
    memberstore.removeGoal(loggedInUser.id, goalId);
   response.redirect('/dashboard');
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
      date:  moment().format('L'),
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
    memberstore.addAssessment(loggedInUser.id, newAssessment);
    response.redirect('/dashboard');
  },
  
    addGoal(request, response) {
    const loggedInUser = accounts.getCurrentMember(request);
    const goal = loggedInUser.goals;
    const assessment = loggedInUser.assessments;
   
    let goalWeight = false;
      
      
    // if (goal.length > 1){
      goalWeight = assessment[assessment.length - 1].weight < request.body.target;
       
     console.log(goalWeight)
     console.log(request.body.target)
     console.log(assessment[assessment.length - 1].weight )
       
  // } 
   
    const newGoal = {
      id: uuid(),
      memberid: loggedInUser.id,
      username: loggedInUser.name,
      date:  request.body.date,
      goal: request.body.goal,
     target: request.body.target,
     goalWeight: goalWeight,
    
    };
    logger.debug('Creating a new goal', newGoal);
    memberstore.addGoal(loggedInUser.id, newGoal);
    response.redirect('/dashboard');
  },
  

  
  
};

module.exports = member;