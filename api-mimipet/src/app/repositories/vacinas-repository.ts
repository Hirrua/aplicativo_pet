import Vacina from "../entities/vacinas";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/error";
import vacinaSchemaValidation from "../utils/validation/vacina-validation";
import { ValidationErrorItem } from "joi";
import { IVacinaInput, IVacinaOutput } from "../inferfaces/vacinas-interface";

class VacinaRepository {
  private static vacinaRepository = AppDataSource.getRepository(Vacina)

  static async getVacina(): Promise<IVacinaOutput[]> {
    return this.vacinaRepository.find()
  }

  static async postVacina(vacina: IVacinaInput): Promise<IVacinaOutput> {
    if (!vacina) {
      throw new ErrorExtention(400, "Nenhum dado enviado")
    }

    const { error } = vacinaSchemaValidation.validate(vacina, { abortEarly: false }) // Criar um middleware para validar
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    const newVacina = await this.vacinaRepository.save(vacina)
    return newVacina
  }

  static async putVacina(id: number, vacina: IVacinaInput): Promise<string> {
    const vacina_existe = await this.vacinaRepository.findOneBy({ id })
    if (!vacina_existe) {
      throw new ErrorExtention(404, "Vacina não encontrado")
    }
    
    const { error } = vacinaSchemaValidation.validate(vacina, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }
    
    await this.vacinaRepository.update(id, vacina)
    return "A vacina foi atualizada!"
  }

  static async deleteVacina(id: number): Promise<string> {
    const vacina_existe = await this.vacinaRepository.findOneBy({ id })
    if (!vacina_existe) {
      throw new ErrorExtention(404, "Vacina não encontrado")
    }

    await this.vacinaRepository.delete(id)
    return "A vacina foi deletada"
  }
}

export default VacinaRepository