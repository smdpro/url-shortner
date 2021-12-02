const express = require('express');
const routerBase = require('./routerBase');
const apiRouter = require('./router');
const router = express.Router();

router.use('/', routerBase);
router.use('/api/v1/url', apiRouter);

module.exports = router;
