import Estoque from "../entities/estoque";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/error";
import estoqueSchemaValidation from "../utils/validation/estoque-validation";
import { IEstoqueInput, IEstoqueOutput } from "../inferfaces/estoque-interface";
import { ValidationErrorItem } from "joi";

class EstoqueRepository {
  private static estoqueRepository = AppDataSource.getRepository(Estoque)

  static async getEstoque(): Promise<IEstoqueOutput[]> {
    return this.estoqueRepository.find()
  }

  static async postEstoque(estoque: IEstoqueInput): Promise<IEstoqueOutput> {
    if (!estoque) {
      throw new ErrorExtention(400, "Nenhum dado enviado")
    }

    const { error } = estoqueSchemaValidation.validate(estoque, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    const newEstoqueItem = await this.estoqueRepository.save(estoque)
    return newEstoqueItem
  }

  static async putEstoque(id: number, estoque: IEstoqueInput): Promise<string> {
    const estoque_existe = await this.estoqueRepository.findOneBy({ id })
    if (!estoque_existe) {
      throw new ErrorExtention(404, "Não existe nenhum estoque")
    }
    
    const { error } = estoqueSchemaValidation.validate(estoque, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    await this.estoqueRepository.update(id, estoque)
    return "O estoque foi atualizado!"
  }

  static async deleteEstoque(id: number): Promise<string> {
    const estoque_existe = await this.estoqueRepository.findOneBy({ id })
    if (!estoque_existe) {
      throw new ErrorExtention(404, "O estoque em questão não foi encontrado")
    }

    await this.estoqueRepository.delete(id)
    return "O estoque foi deletado!"
  }
}

export default EstoqueRepository