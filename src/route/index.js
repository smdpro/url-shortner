const express = require('express');
const routerBase = require('./routerBase');
const apiRouter = require('./router');
const userRouter = require('./user');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.use('/', routerBase);
router.use('/api/v1/url', authenticate, apiRouter);
router.use('/api/v1/user', userRouter);

module.exports = router;
