const { validationResult } = require('express-validator');
const { psicologoRequiredFieldsPost, psicologoRequiredFieldsPatch, psicologoLoginRequiredFields } = require('./psicologoValidations');
const { userRequiredFieldsPost, userRequiredFieldsPatch, userLoginRequiredFields } = require('./userValidations');

module.exports = {
  psicologoRequiredFieldsPost,
  psicologoRequiredFieldsPatch,
  psicologoLoginRequiredFields,
  userRequiredFieldsPost,
  userRequiredFieldsPatch,
  userLoginRequiredFields,
  async returnValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
};