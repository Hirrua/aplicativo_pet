import Joi from "joi"

const animalSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não deve estar vazio",
    "string.min": "O campo nome deve ter pelo menos 3 caracteres",
    "string.max": "O campo nome deve ter no máximo 50 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  sexo: Joi.string().required().min(1).max(1).messages({
    "string.base": "O campo sexo deve ser uma string",
    "string.empty": "O campo sexo não deve estar vazio",
    "string.min": "O campo sexo deve ter pelo menos 1 caracteres",
    "string.max": "O campo sexo deve ter no máximo 1 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  especie: Joi.string().required().min(3).max(100).messages({
    "string.base": "O campo sexo deve ser uma string",
    "string.empty": "O campo sexo não deve estar vazio",
    "string.min": "O campo sexo deve ter pelo menos 3 caracteres",
    "string.max": "O campo sexo deve ter no máximo 100 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  cor: Joi.string().optional().min(4).max(50).messages({
    "string.base": "O campo cor deve ser uma string",
    "string.min": "O campo cor deve ter pelo menos 4 caracteres",
    "string.max": "O campo cor deve ter no máximo 50 caracteres",
  }),
  raca: Joi.string().optional().min(3).max(50).messages({
    "string.base": "O campo raca deve ser uma string",
    "string.min": "O campo raca deve ter pelo menos 3 caracteres",
    "string.max": "O campo raca deve ter no máximo 50 caracteres",
  }),
  id_tutor: Joi.number().required().messages({
    "number.base": "O user_id precisa ser um numero",
    "number.empty": "O user_id não pode estar vazio"
  })
})

export default animalSchemaValidation