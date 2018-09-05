'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore = {

  store: new JsonStore('./models/trainer-store.json', { trainers: [] }),
  collection: 'trainers',

  getAllUsers() {
    return this.store.findAll(this.collection);
  }, 
  
  gettrainer(id){
    return this.store.findOneBy(this.collection, { id: id });
  },

  addtrainer(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getTrainerPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },
};

module.exports = trainerStore;