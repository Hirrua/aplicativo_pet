import Joi from "joi"

const estoqueSchemaValidation = Joi.object({
  lote: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo lote deve ser uma string",
    "string.empty": "O campo lote não deve estar vazio",
    "string.min": "O campo lote deve ter pelo menos 3 caracteres",
    "string.max": "O campo lote deve ter no máximo 50 caracteres",
    "any.required": "O campo lote é obrigatório"
  }),
  codigo: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo código deve ser uma string",
    "string.empty": "O campo código não deve estar vazio",
    "string.min": "O campo código deve ter pelo menos 3 caracteres",
    "string.max": "O campo código deve ter no máximo 50 caracteres",
    "any.required": "O campo código é obrigatório"
  }),
  quantidade: Joi.number().required().integer().positive().messages({
    "number.base": "O campo quantidade deve ser um número",
    "number.integer": "O campo quantidade deve ser um número inteiro",
    "number.positive": "O campo quantidade deve ser positivo",
    "any.required": "O campo quantidade é obrigatório"
  }),
  status: Joi.string().optional().valid("ativo", "inativo").messages({
    "string.base": "O campo status deve ser uma string",
    "any.only": "O campo status deve ser 'ativo' ou 'inativo'"
  }),
  unidade_medida: Joi.string().optional().max(10).messages({
    "string.base": "O campo unidade de medida deve ser uma string",
    "string.max": "O campo unidade de medida deve ter no máximo 10 caracteres"
  }),
  vencimento_em: Joi.date().required().messages({
    "date.base": "O campo vencimento deve ser uma data válida",
    "any.required": "O campo vencimento é obrigatório"
  }),
  vacina_id: Joi.number().required().integer().positive().messages({
    "number.base": "O campo vacina_id deve ser um número",
    "number.integer": "O campo vacina_id deve ser um número inteiro",
    "number.positive": "O campo vacina_id deve ser positivo",
    "any.required": "O campo vacina_id é obrigatório"
  })
})

export default estoqueSchemaValidation