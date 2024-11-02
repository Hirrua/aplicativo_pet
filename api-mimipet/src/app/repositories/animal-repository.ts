import Animal from "../entities/animal";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/error";
import { IAnimalInput, IAnimalOutput, IAnimalUpdateInput } from "../inferfaces/animal-interface";
import animalSchemaValidation from "../utils/validation/animal-validation";
import { ValidationErrorItem } from "joi";

class AnimalRepository {
  private static animalReporsitory = AppDataSource.getRepository(Animal)

  static async getAnimal(): Promise<IAnimalOutput[]> {
    return this.animalReporsitory.find()
  }

  static async getOneAnimal(id: number): Promise<IAnimalOutput> {
    const animal = await this.animalReporsitory.findOneBy({ id })
    if (!animal) {
      throw new ErrorExtention(404, "Animal(a) não encontrado")
    }

    return animal
  }

  static async postAnimal(animal: IAnimalInput): Promise<IAnimalOutput> {
    const { error } = animalSchemaValidation.validate(animal, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(',')) // MELHORAR O TRATAMENTO DE ERROS
    }

    const newAnimal = await this.animalReporsitory.save(animal)
    return newAnimal
  }
  // SCHEMA PARA INTERFACE DE UPDATE
  static async putAnimal(id: number, animal: IAnimalUpdateInput): Promise<string> {
    const { error } = animalSchemaValidation.validate(animal, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    const animal_existe = await this.animalReporsitory.findOneBy({ id })
    if (!animal_existe) {
      throw new ErrorExtention(404, "Animal(a) não encontrado")
    }

    await this.animalReporsitory.update(id, animal)
    return "O Animal foi atualizado"
  }

  static async deleteAnimal(id: number): Promise<string> {
    const animal_existe = await this.animalReporsitory.findOneBy({ id })
    if (!animal_existe) {
      throw new ErrorExtention(404, "Animal não encontrado")
    }

    await this.animalReporsitory.delete(id)
    return "O Animal foi deletado"
  }
}

export default AnimalRepository
