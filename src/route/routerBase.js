const express = require('express');
const validateId = require('../middleware/validate');
const controller = require('../../controller/controller');
const router = express.Router();


router.route('/:id').get(validateId(), controller.getLink);


module.exports = router;
