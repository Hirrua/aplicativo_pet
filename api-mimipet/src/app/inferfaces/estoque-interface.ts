interface IEstoqueInput {
  lote: string
  codigo: string
  quantidade: number
  status?: string
  unidade_medida?: string
  vencimentos_em: Date
  vacina_id: number
}

interface IEstoqueOutput extends IEstoqueInput {
  id: number
  inserido_em: Date
}