// .env の GEMINI_API_KEY を extra に渡し、記述式のAI採点で利用する
require('dotenv').config();

const appJson = require('./app.json');
module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY || '',
    },
  },
};
