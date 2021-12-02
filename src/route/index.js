const express = require('express');
const routerBase = require('./routerBase');
const router = require('./router');
const router = express.Router();

router.use('/', routerBase);
router.use('/api/v1/url', router);

module.exports = router;
