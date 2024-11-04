interface IEstoqueInput {
  lote: string
  codigo: string
  quantidade: number
  status?: string
  unidade_medida?: string
  vencimento_em: Date
  vacina_id: number
}

interface IEstoqueOutput extends IEstoqueInput {
  id: number
  inserido_em: Date
}

export { IEstoqueInput, IEstoqueOutput }