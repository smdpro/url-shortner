const express = require('express');
const routerBase = require('./routerBase');
const apiRouter = require('./router');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.use('/', routerBase);
router.use('/api/v1/url',authenticate, apiRouter);

module.exports = router;
