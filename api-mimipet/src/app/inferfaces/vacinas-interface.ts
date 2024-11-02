interface IVacinaInput {
  nome: string
  fabricante: string
  anotacoes?: string
  intervalo: number
  doses: number
}

interface IVacinaOutput extends IVacinaInput {
  id: number
}