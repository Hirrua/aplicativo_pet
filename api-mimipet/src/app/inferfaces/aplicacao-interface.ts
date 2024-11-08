interface IAplicacaoInput {
  data_aplicacao: Date
  quantidade_aplicada: number
  responsavel_aplicacao: string
  animal_id: number
  vacina_id: number
}

interface IAplicacaoOutput extends IAplicacaoInput {
  id: number
}

interface IAplicacaoUpdate {
  data_aplicacao?: Date
  quantidade_aplicada?: number
  responsavel_aplicacao?: string
  animal_id?: number
  vacina_id?: number
}

export { IAplicacaoInput, IAplicacaoOutput, IAplicacaoUpdate }