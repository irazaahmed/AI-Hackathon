const express = require('express');
const { addFAQ, getFAQs } = require('../controllers/faqController');
const router = express.Router();

router.post('/add', addFAQ);
router.get('/', getFAQs);

module.exports = router;
