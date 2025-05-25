const express = require('express');
const { generateAndSendIDCard } = require('../controllers/idCardController');
const router = express.Router();

router.post('/generate', generateAndSendIDCard); // this must match the function name in controller

module.exports = router;
