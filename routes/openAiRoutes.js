const express = require('express');
const router =  express.Router();

const {generateImage} = require('../controllers/openAIController');

router.post('/generateImage',generateImage);

module.exports =  router;