const express = require('express');
const controller = require('../../controller/user');
const validateId = require('../../middleware/validate');
const router = express.Router();


router
  .route('/')
  .post(controller.register)
  .put(controller.login);


module.exports = router;
