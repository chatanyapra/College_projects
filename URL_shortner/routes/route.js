const express = require('express');
const { createUrl, redirectUrl, getStats } = require('../controller/controller.js');
const router = express.Router();

router.post('/', createUrl);
router.get('/stats/:code', getStats);
router.get('/:code', redirectUrl);

module.exports = { router }