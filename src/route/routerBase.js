const express = require('express');
const controller = require('../../controller/controller');
const router = express.Router();


router
  .route('/:id')
  .get(controller.getLink)


module.exports = router;
