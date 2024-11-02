interface ITutorInput {
  nome: string
  sobrenome: string
  email: string
  senha: string
  celular: string
  cpf: string
}

interface ITutorOutput extends ITutorInput {
  id: number
}

interface ITutorUpdateInput {
  nome?: string
  sobrenome?: string
  email?: string
  senha?: string
  cpf?: string
  celular?: string
}

export { ITutorInput, ITutorOutput, ITutorUpdateInput}