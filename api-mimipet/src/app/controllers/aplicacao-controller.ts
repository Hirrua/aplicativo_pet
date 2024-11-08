import { Request, Response, Router } from "express";
import AplicacaoVacinaRepository from "../repositories/aplicacao-repository";

class AplicacaoVacinaController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initialize()
  }

  private initialize() {
    this.router.post('/', this.createAplicacao)
  }

  private async createAplicacao(req: Request, res: Response) {
    const newAplicacao = await AplicacaoVacinaRepository.newAplicarVacina(req.body)
    res.status(201).json(newAplicacao)
  }
}

const aplicacaoVacinaController = new AplicacaoVacinaController().router

export default aplicacaoVacinaController