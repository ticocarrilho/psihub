const { body } = require('express-validator');

const NAME_EMPTY = 'O campo de Nome não pode estar vazio.';
const EMAIL_EMPTY = 'O campo de E-mail não pode estar vazio.';
const EMAIL_INVALID = 'Insira um e-mail válido.';
const PASSWORD_MIN = 'A senha deve ter mais de 8 caracteres.';
const PASSWORD_EMPTY = 'O campo de Senha não pode estar vazio.';
const CRP_EMPTY = 'O campo de CRP não pode estar vazio.';
const ESTADO_EMPTY = 'O campo de Estado não pode estar vazio.';
const TELEFONE_EMPTY = 'O campo de Telefone não pode estar vazio.';
const DATA_NASCIMENTO_EMPTY = 'O campo de Data de Nascimento não pode estar vazio.';

module.exports = {
  psicologoRequiredFieldsPost: [
    body('nome').trim().notEmpty().withMessage(NAME_EMPTY),
    body('crp').trim().notEmpty().withMessage(CRP_EMPTY),
    body('estado').trim().notEmpty().withMessage(ESTADO_EMPTY),
    body('telefone').trim().notEmpty().withMessage(TELEFONE_EMPTY),
    body('dataNascimento').trim().notEmpty().withMessage(DATA_NASCIMENTO_EMPTY),
    body('email')
      .trim()
      .notEmpty()
      .withMessage(EMAIL_EMPTY)
      .bail()
      .isEmail()
      .withMessage(EMAIL_INVALID),
    body('senha')
      .trim()
      .notEmpty()
      .withMessage(PASSWORD_EMPTY)
      .bail()
      .isLength({ min: 8 })
      .withMessage(PASSWORD_MIN),
  ],
  
  psicologoRequiredFieldsPatch: [
    body('nome').optional().trim().notEmpty().withMessage(NAME_EMPTY),
    body('crp').optional().trim().notEmpty().withMessage(CRP_EMPTY),
    body('estado').optional().trim().notEmpty().withMessage(ESTADO_EMPTY),
    body('telefone').optional().trim().notEmpty().withMessage(TELEFONE_EMPTY),
    body('dataNascimento').optional().trim().notEmpty().withMessage(DATA_NASCIMENTO_EMPTY),
    body('email')
      .optional()
      .trim()
      .notEmpty()
      .withMessage(EMAIL_EMPTY)
      .bail()
      .isEmail()
      .withMessage(EMAIL_INVALID),
      body('senha')
        .optional()
        .trim()
        .notEmpty()
        .withMessage(PASSWORD_EMPTY)
        .bail()
        .isLength({ min: 8 })
        .withMessage(PASSWORD_MIN),
    ],
    
    psicologoLoginRequiredFields: [
      body('email')
        .trim()
        .notEmpty()
        .withMessage(EMAIL_EMPTY)
        .bail()
        .isEmail()
        .withMessage(EMAIL_INVALID),
      body('senha')
        .notEmpty()
        .withMessage(PASSWORD_EMPTY)
        .bail()
        .isLength({ min: 8 })
        .withMessage(PASSWORD_MIN),
    ],
  };