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
  
    getMemeberById(id) {
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

  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
    



    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId});
    this.store.save();
  },
};

module.exports = memberStore;
