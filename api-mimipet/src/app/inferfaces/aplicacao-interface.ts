import { IAnimalOutput } from "./animal-interface"
import { IVacinaOutput } from "./vacinas-interface"

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

interface IAplicacaoCompleta {
  id: number;
  data_aplicacao: Date;
  quantidade_aplicada: number;
  responsavel_aplicacao: string;
  vacina_id: number;
  animal_id: number;
  vacina: IVacinaOutput
  animal: IAnimalOutput
}

export { IAplicacaoInput, IAplicacaoOutput, IAplicacaoCompleta }