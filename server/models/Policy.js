const { Schema } = require('mongoose');

const policySchema = new Schema({
  legislation: {
      type: String,
      required: true,
    },
  countryCode: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  lastUpdated: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
});

module.exports = policySchema;
