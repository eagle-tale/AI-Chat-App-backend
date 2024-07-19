const express = require('express');
const router = express.Router();
const { createKnowledge, getKnowledge, searchKnowledge } = require('../controllers/knowledgeController');

router.post('/', createKnowledge);
router.get('/', getKnowledge);
router.get('/search', searchKnowledge);

module.exports = router;