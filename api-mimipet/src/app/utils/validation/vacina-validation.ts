import Joi from "joi"

const vacinaSchemaValidation = Joi.object({
  nome: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não deve estar vazio",
    "string.min": "O campo nome deve ter pelo menos 3 caracteres",
    "string.max": "O campo nome deve ter no máximo 50 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  fabricante: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo fabricante deve ser uma string",
    "string.empty": "O campo fabricante não deve estar vazio",
    "string.min": "O campo fabricante deve ter pelo menos 3 caracteres",
    "string.max": "O campo fabricante deve ter no máximo 50 caracteres",
    "any.required": "O campo fabricante é obrigatório"
  }),
  anotacoes: Joi.string().optional().max(255).messages({
    "string.base": "O campo anotações deve ser uma string",
    "string.max": "O campo anotações deve ter no máximo 255 caracteres"
  }),
  intervalo: Joi.number().required().integer().positive().messages({
    "number.base": "O campo intervalo deve ser um número",
    "number.integer": "O campo intervalo deve ser um número inteiro",
    "number.positive": "O campo intervalo deve ser positivo",
    "any.required": "O campo intervalo é obrigatório"
  }),
  doses: Joi.number().required().integer().positive().messages({
    "number.base": "O campo doses deve ser um número",
    "number.integer": "O campo doses deve ser um número inteiro",
    "number.positive": "O campo doses deve ser positivo",
    "any.required": "O campo doses é obrigatório"
  })
})

export default vacinaSchemaValidation
