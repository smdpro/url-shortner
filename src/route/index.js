const express = require('express');
const routerBase = require('./v1/routerBase');
const apiRouter = require('./v1/router');
const userRouter = require('./v1/user');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.use('/', routerBase);
router.use('/api/v1/url', authenticate, apiRouter);
router.use('/api/v1/user', userRouter);

module.exports = router;
