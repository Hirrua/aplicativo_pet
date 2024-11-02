interface IAnimalInput {
  nome: string
  sexo: string
  especie: string
  cor?: string
  raca?: string
  memorial?: boolean
  id_tutor: number
}

interface IAnimalOutput extends IAnimalInput {
  id: number
}

interface IAnimalUpdateInput {
  nome?: string
  sexo?: string
  especie?: string
  cor?: string
  raca?: string
  memorial?: boolean
  id_tutor?: number
}

export { IAnimalInput, IAnimalOutput, IAnimalUpdateInput }