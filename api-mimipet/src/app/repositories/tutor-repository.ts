import Tutor from "../entities/tutor";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/error";
import { tutorSchemaValidation, tutorUpdateSchemaValidation } from "../utils/validation/tutor-validation";
import { ITutorInput, ITutorOutput, ITutorUpdateInput } from "../inferfaces/tutor-interface";
import { ValidationErrorItem } from "joi";
import bcrypt from "bcryptjs"
import { ILogin } from "../inferfaces/login-interface";
import Auth from "../utils/auth";

class TutorRepository {
  private static tutorRepository = AppDataSource.getRepository(Tutor)

  static async getTutor(): Promise<ITutorOutput[]> {
    return this.tutorRepository.find()
  }

  static async getOneTutor(id: number): Promise<ITutorOutput> {
    const tutor = await this.tutorRepository.findOne({
      where: { id },
      relations: { animais: true },
      select: ["id", "nome", "sobrenome", "email", "cpf", "celular", "criado_em"]
    })
    if (!tutor) {
      throw new ErrorExtention(404, "Tutor(a) não encontrado")
    }

    return tutor
  }

  static async postTutor(tutor: ITutorInput): Promise<ITutorOutput> {
    const { error } = tutorSchemaValidation.validate(tutor, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(tutor.senha, salt)
    tutor.senha = hashedPassword

    const newTutor = await this.tutorRepository.save(tutor)
    return newTutor
  }

  static async putTutor(id: number, tutor: ITutorUpdateInput): Promise<string> {
    const { error } = tutorUpdateSchemaValidation.validate(tutor, { abortEarly: false })
    if (error) {
      const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
      throw new ErrorExtention(400, validationError.join(','))
    }

    const tutor_existe = await this.tutorRepository.findOneBy({ id })
    if (!tutor_existe) {
      throw new ErrorExtention(404, "Tutor(a) não encontrado")
    }

    await this.tutorRepository.update(id, tutor)
    return "O(A) tutor(a) foi atualizado"
  }

  static async deleteTutor(id: number): Promise<string> {
    const tutor_existe = await this.tutorRepository.findOneBy({ id })
    if (!tutor_existe) {
      throw new ErrorExtention(404, "Tutor(a) não encontrado")
    }

    await this.tutorRepository.delete(id)
    return "O(A) Tutor(a) foi deletado"
  }

  static async getTutorEmail(email: string): Promise<ITutorOutput | null> {
    return this.tutorRepository.findOneBy({ email })
  }

  static async authTutor(loginData: ILogin): Promise<string> {
    const { email, senha } = loginData
    if (!email || !senha) {
      throw new ErrorExtention(401, "Dados faltantes")
    }

    const tutor = await this.getTutorEmail(email)
    if (!tutor) {
      throw new ErrorExtention(401, "E-mail ou senha errados")
    } else {
      const verifyPassword = bcrypt.compare(senha, tutor.senha)
      if (!verifyPassword) {
        throw new ErrorExtention(401, "E-mail ou senha errados")
      }
    }

    const payload = { nome: tutor.nome, email: tutor.email }
    const auth = new Auth()
    const token = auth.jwtGenerator(payload)
    return token
  }
}

export default TutorRepository