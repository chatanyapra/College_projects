const express = require('express');
const { createUrl, redirectUrl } = require('../controller/controller.js');
const router = express.Router();

router.post('/', createUrl);
router.get('/:code', redirectUrl);

module.exports = { router }