'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { memberCollection: [] }),
  collection: 'memberCollection',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
    getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMembers(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  removeAllMembers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
    getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
      getMemberByName(name) {
    return this.store.findOneBy(this.collection, { name: name });
  },

    getMemberPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },
  
  addAssessment(memberid, assessment) {
    const member = this.getMember(memberid);
    member.assessments.push(assessment);
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessment = member.assessments;
    _.remove(assessment, { id: assessmentId});
    this.store.save();
  },
  
   getAssessment(id) {
    const test = this.store.findOneBy(this.colection, { id: id });
    return this.store.findOneBy('members.assessments', { id: id });
  },
  

  
    addComment(id, memberid, comment) {
    const member = this.getMember(memberid)
    const assessment = member.assessments;
    const update = assessment.map(i=> i.id).indexOf(id);
    assessment[update].comments = comment;
    this.store.save();
  },
  
  
    updateMember(member, update){
    
    if(update.password !="") member.password = update.password;
    if(update.address !="") member.address = update.address;
    if(update.height !="") member.height = update.height;
    if(update.startingweight !="") member.startingweight = update.startingweight;      
    this.store.save();
  },
  
    addGoal(memberid, goal) {
    const member = this.getMember(memberid);
    member.goals.push(goal);
    this.store.save();
  },
    removeGoal(id, goalId) {
    const member = this.getMember(id);
    const goal = member.goals;
    _.remove(goal, { id: goalId});
    this.store.save();
  },
};

module.exports = memberStore;
