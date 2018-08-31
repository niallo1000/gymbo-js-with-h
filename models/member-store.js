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

  addAssessment(memberid, assessment) {
    const member = this.getMember(memberid);
    member.assessments.push(assessment);
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId});
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
  
    updateUser(user, update){
    
    if(update.password !="") user.password = update.password;
    if(update.address !="") user.address = update.address;
    this.store.save();



  },
};

module.exports = memberStore;
