import Joi from "joi";

const tutorSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().required().min(3).max(50).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não deve estar vazio",
    "string.min": "O campo nome deve ter pelo menos 3 caracteres",
    "string.max": "O campo nome deve ter no máximo 50 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  sobrenome: Joi.string().optional().min(2).max(50).messages({
    "string.base": "O campo sobrenome deve ser uma string",
    "string.min": "O campo sobrenome deve ter pelo menos 2 caracteres",
    "string.max": "O campo sobrenome deve ter no máximo 50 caracteres"
  }),
  email: Joi.string().email().required().min(10).max(50).messages({
    "string.email": "O campo email deve ser um email",
    "string.empty": "O campo email não deve estar vazio",
    "string.min": "O campo email deve ter pelo menos 3 caracteres",
    "string.max": "O campo email deve ter no máximo 50 caracteres",
    "any.required": "O campo email é obrigatório"
  }),
  senha: Joi.string().required().min(8).max(255).messages({
    "string.base": "O campo senha deve ser uma string",
    "string.empty": "O campo senha não deve estar vazio",
    "string.min": "O campo senha deve ter pelo menos 8 caracteres",
    "string.max": "O campo senha deve ter no máximo 255 caracteres",
    "any.required": "O campo senha é obrigatório"
  }),
  celular: Joi.string().optional().min(11).max(11).messages({
    "string.base": "O campo celular deve ser uma string",
    "string.min": "O campo celular deve ter pelo menos 11 caracteres",
    "string.max": "O campo celular deve ter no máximo 13 caracteres"
  }),
  cpf: Joi.string().required().min(14).max(14).messages({
    "string.base": "O campo cpf deve ser uma string",
    "string.empty": "O campo cpf não deve estar vazio",
    "string.min": "O campo cpf deve ter pelo menos 14 caracteres",
    "string.max": "O campo cpf deve ter no máximo 14 caracteres",
    "any.required": "O campo cpf é obrigatório"
  })
})

const tutorUpdateSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().optional().min(3).max(50).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não deve estar vazio",
    "string.min": "O campo nome deve ter pelo menos 3 caracteres",
    "string.max": "O campo nome deve ter no máximo 50 caracteres",
    "any.required": "O campo nome é obrigatório"
  }),
  sobrenome: Joi.string().optional().min(2).max(50).messages({
    "string.base": "O campo sobrenome deve ser uma string",
    "string.min": "O campo sobrenome deve ter pelo menos 2 caracteres",
    "string.max": "O campo sobrenome deve ter no máximo 50 caracteres"
  }),
  email: Joi.string().email().optional().min(10).max(50).messages({
    "string.email": "O campo email deve ser um email",
    "string.empty": "O campo email não deve estar vazio",
    "string.min": "O campo email deve ter pelo menos 3 caracteres",
    "string.max": "O campo email deve ter no máximo 50 caracteres",
    "any.required": "O campo email é obrigatório"
  }),
  senha: Joi.string().optional().min(8).max(255).messages({
    "string.base": "O campo senha deve ser uma string",
    "string.empty": "O campo senha não deve estar vazio",
    "string.min": "O campo senha deve ter pelo menos 8 caracteres",
    "string.max": "O campo senha deve ter no máximo 255 caracteres",
    "any.required": "O campo senha é obrigatório"
  }),
  celular: Joi.string().optional().min(11).max(13).messages({
    "string.base": "O campo celular deve ser uma string",
    "string.min": "O campo celular deve ter pelo menos 11 caracteres",
    "string.max": "O campo celular deve ter no máximo 13 caracteres"
  }),
  cpf: Joi.string().optional().min(14).max(14).messages({
    "string.base": "O campo cpf deve ser uma string",
    "string.empty": "O campo cpf não deve estar vazio",
    "string.min": "O campo cpf deve ter pelo menos 14 caracteres",
    "string.max": "O campo cpf deve ter no máximo 14 caracteres",
    "any.required": "O campo cpf é obrigatório"
  })
})

export { tutorSchemaValidation, tutorUpdateSchemaValidation }