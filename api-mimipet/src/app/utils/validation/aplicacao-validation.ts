import Joi from "joi"

const aplicacaoSchemaValidation = Joi.object({
  data_aplicacao: Joi.date().required().messages({
    "date.base": "O campo data_aplicacao deve ser uma data válida",
    "any.required": "O campo data_aplicacao é obrigatório"
  }),
  quantidade_aplicada: Joi.number().required().positive().messages({
    "number.base": "O campo quantidade_aplicada deve ser um número",
    "number.positive": "O campo quantidade_aplicada deve ser positivo",
    "any.required": "O campo quantidade_aplicada é obrigatório"
  }),
  responsavel_aplicacao: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo responsável pela aplicação deve ser uma string",
    "string.empty": "O campo responsável pela aplicação não deve estar vazio",
    "string.min": "O campo responsável pela aplicação deve ter pelo menos 3 caracteres",
    "string.max": "O campo responsável pela aplicação deve ter no máximo 50 caracteres",
    "any.required": "O campo responsável pela aplicação é obrigatório"
  }),
  animal_id: Joi.number().required().integer().positive().messages({
    "number.base": "O campo animal_id deve ser um número",
    "number.integer": "O campo animal_id deve ser um número inteiro",
    "number.positive": "O campo animal_id deve ser positivo",
    "any.required": "O campo animal_id é obrigatório"
  }),
  vacina_id: Joi.number().required().integer().positive().messages({
    "number.base": "O campo vacina_id deve ser um número",
    "number.integer": "O campo vacina_id deve ser um número inteiro",
    "number.positive": "O campo vacina_id deve ser positivo",
    "any.required": "O campo vacina_id é obrigatório"
  })
})

const aplicacaoUpdateSchemaValidation = Joi.object({
  data_aplicacao: Joi.date().required().messages({
    "date.base": "O campo data_aplicacao deve ser uma data válida",
    "any.required": "O campo data_aplicacao é obrigatório"
  }),
  quantidade_aplicada: Joi.number().required().positive().messages({
    "number.base": "O campo quantidade_aplicada deve ser um número",
    "number.positive": "O campo quantidade_aplicada deve ser positivo",
    "any.required": "O campo quantidade_aplicada é obrigatório"
  }),
  responsavel_aplicacao: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo responsável pela aplicação deve ser uma string",
    "string.empty": "O campo responsável pela aplicação não deve estar vazio",
    "string.min": "O campo responsável pela aplicação deve ter pelo menos 3 caracteres",
    "string.max": "O campo responsável pela aplicação deve ter no máximo 50 caracteres",
    "any.required": "O campo responsável pela aplicação é obrigatório"
  }),
  animal_id: Joi.number().required().integer().positive().messages({
    "number.base": "O campo animal_id deve ser um número",
    "number.integer": "O campo animal_id deve ser um número inteiro",
    "number.positive": "O campo animal_id deve ser positivo",
    "any.required": "O campo animal_id é obrigatório"
  }),
  vacina_id: Joi.number().required().integer().positive().messages({
    "number.base": "O campo vacina_id deve ser um número",
    "number.integer": "O campo vacina_id deve ser um número inteiro",
    "number.positive": "O campo vacina_id deve ser positivo",
    "any.required": "O campo vacina_id é obrigatório"
  })
})


export  { aplicacaoSchemaValidation, aplicacaoUpdateSchemaValidation }