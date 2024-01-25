const { Schema } = require('mongoose');

const CountrySummarySchema = new Schema({
  countryName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  executiveSummary: {
    type: String,
  },
  dataGov: {
    type: String,
  },
  contentMod: {
    type: String,
  },
  competitionPolicy: {
    type: String,
  },
  other: {
    type: String,
  },
});

module.exports = CountrySummarySchema;
