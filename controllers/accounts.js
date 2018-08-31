'use strict';

const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
      trainerlogin(request, response) {
    const viewData = {
      title: 'Trainer Login to the Service',
    };
    response.render('trainerlogin', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Register to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid();
    member.assessments = [];    
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },
  
  
      authenticatetrainer(request, response) {
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (trainer) {
      response.cookie('trainer', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    } else {
      response.redirect('/trainerlogin');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberstore.getMemberByEmail(memberEmail);
  },
  
    getCurrentTrainer(request) {
    const trainerEmail = request.cookies.trainer;
    return trainerstore.getTrainerByEmail(trainerEmail);
  },
  
    updatereg(request, response){

    const loggedInUser = accounts.getCurrentMember(request);
    const name = request.body.name;
    const gender = request.body.gender;
    const email = request.body.email;
    const password = request.body.password;
    const address = request.body.address;   
    const height = request.body.height;
    const startweight = request.body.startweight;            
    const update =  request.body;

    if(update.password !="" || update.address != ""){
      memberstore.updateUser(loggedInUser, update)
    }

   response.redirect('/dashboard')

  },
};

module.exports = accounts;