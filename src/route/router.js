const express = require('express');
const controller = require('../controller/controller');
const validateId = require('../middleware/validate');
const router = express.Router();


router
  .route('/')
  .post(controller.create)
  .get(controller.getAll);
router
  .route('/:id')
  .get(validateId(), controller.getById)
  .put(validateId(),controller.update)
  .delete(validateId(),controller.delete);

module.exports = router;
