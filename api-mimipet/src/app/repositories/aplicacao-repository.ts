import AplicacaoVacina from "../entities/aplicacao";
import Animal from "../entities/animal";
import Vacina from "../entities/vacinas";
import Estoque from "../entities/estoque";
import { AppDataSource } from "../../database/data-source";
import { aplicacaoSchemaValidation } from "../utils/validation/aplicacao-validation";
import ErrorExtention from "../utils/error";
import { ValidationErrorItem } from "joi";
import { IAplicacaoInput, IAplicacaoOutput, IAplicacaoUpdate } from "../inferfaces/aplicacao-interface";
import { MoreThanOrEqual } from "typeorm";

class AplicacaoVacinaRepository {
  private static aplicacaoRepository = AppDataSource.getRepository(AplicacaoVacina)

  static async getAplicacao(): Promise<IAplicacaoOutput[]> {
    return this.aplicacaoRepository.find()
  }

  static async newAplicarVacina(dadosAplicacaoVacina: IAplicacaoInput): Promise<string> {
    const aplicarVacinacao = await AppDataSource.transaction(async(transactionalEntityManager) => {
      const { error } = aplicacaoSchemaValidation.validate(dadosAplicacaoVacina, { abortEarly: false })
      if (error) {
        const validationError = error.details.map((deltail: ValidationErrorItem) => deltail.message)
        throw new ErrorExtention(400, validationError.join(","))
      }

      const { animal_id, vacina_id, quantidade_aplicada, data_aplicacao, responsavel_aplicacao } = dadosAplicacaoVacina

      const animal_existe = await transactionalEntityManager.findOne(Animal, { where: { id: animal_id }  })
      if (!animal_existe) {
        throw new ErrorExtention(404, "O animal não foi encontrado!")
      }

      const vacina_existe = await transactionalEntityManager.findOne(Vacina, { where: { id: vacina_id } })
      if (!vacina_existe) {
        throw new ErrorExtention(404, "A vacina não foi encontrada!")
      }

      const estoque = await transactionalEntityManager.findOne(Estoque, {
        where: {
          vacina_id,
          quantidade: MoreThanOrEqual(quantidade_aplicada)
        }
      });
      
      if (!estoque) {
        throw new ErrorExtention(400, "Estoque insuficiente para a vacina");
      }
      
      const novaVacinacao = transactionalEntityManager.create(AplicacaoVacina, {
        data_aplicacao,
        responsavel_aplicacao,
        quantidade_aplicada,
        animal_id,
        vacina_id
      })

      await transactionalEntityManager.save(AplicacaoVacina, novaVacinacao)

      estoque.quantidade -= quantidade_aplicada
      await transactionalEntityManager.save(Estoque, estoque)
    })
    return "Vacina aplicada e estoque atualizado!"
  }
}

export default AplicacaoVacinaRepository