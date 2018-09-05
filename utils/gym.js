'use strict';

const accounts = require('../controllers/accounts');
const dashboard = require('../controllers/dashboard');
const memberstore = require('../models/member-store')


const utility = {
	bmi(loggedInUser){
		const assessment = loggedInUser.assessments;
		const lastassessment = assessment[assessment.length - 1]

		let weight = loggedInUser.startingweight;
		if (assessment != ""){
			weight = lastassessment.weight;
		}
		const height = loggedInUser.height;
		const bmi = (weight / (height * height)).toFixed(2);
		let bmicategory = null;

		if(bmi < 16){
			bmicategory = "SEVERELY UNDERWEIGHT"
		} else if (bmi >= 16 && bmi < 18.5) {
			bmicategory = "UNDERWEIGHT"
		} else if (bmi >= 18.5 && bmi < 25) {
			bmicategory = "NORMAL"
		} else if (bmi >= 25 && bmi < 30) {
			bmicategory = "OVERWEIGHT"
		} else if (bmi >= 30 && bmi < 35) {
			bmicategory = "MODERATELY OBESE"
		} else { 
			bmicategory = "SEVERELY OBESE"
		}
		return	{bmi, bmicategory};
	},



	idealweight(loggedInUser, idealweight){

		let weight = loggedInUser.startingweight;
		const height = loggedInUser.height;
		const gender = loggedInUser.gender;
		const assessment = loggedInUser.assessments;
		const lastassessment = assessment[assessment.length - 1];
    const feetToInches = 0.254;
    const fiveFeet = 60;
    const mvalue = 50;
    const fvalue = 45;
    const factor = 2.3;


		if (assessment != ""){
			weight = lastassessment.weight;
		} 

		if (gender === "M"){
		idealweight = mvalue + factor*((height / feetToInches) - fiveFeet)
		} else {
		idealweight = fvalue + factor*((height / feetToInches) - fiveFeet)
		}

		if (weight <= idealweight){
			return true;
		}else{
			return false
		}
	},




};
module.exports = utility;