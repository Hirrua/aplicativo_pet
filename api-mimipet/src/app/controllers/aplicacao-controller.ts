import { Request, Response, Router } from "express"
import AplicacaoVacinaRepository from "../repositories/aplicacao-repository"

class AplicacaoVacinaController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initialize()
  }

  private initialize() {
    this.router.post('/', this.createAplicacao)
    this.router.get('/:animal_id', this.getAplicacaoByAnimal)
  }

  private async createAplicacao(req: Request, res: Response) {
    const newAplicacao = await AplicacaoVacinaRepository.newAplicarVacina(req.body)
    res.status(201).json({ message: newAplicacao })
  }

  private async getAplicacaoByAnimal(req: Request, res: Response) {
    const { animal_id } = req.params
    const aplicacoes = await AplicacaoVacinaRepository.getAplicacaoByAnimal(Number(animal_id))
    res.status(200).json(aplicacoes)
  }
}

const aplicacaoVacinaController = new AplicacaoVacinaController().router

export default aplicacaoVacinaController
