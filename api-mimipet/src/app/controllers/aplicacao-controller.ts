import { Request, Response, Router } from "express"
import AplicacaoVacinaRepository from "../repositories/aplicacao-repository"

class AplicacaoVacinaController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initialize()
  }

  private initialize() {
    this.router.get('/animal/:animal_id', this.getAplicacaoAnimal)
    this.router.get('/recentes', this.getRecenteAplicacao)
    this.router.post('/', this.createAplicacao)
    this.router.get('/:id', this.getAplicacaoById)
  }

  private async createAplicacao(req: Request, res: Response) {
    const newAplicacao = await AplicacaoVacinaRepository.newAplicarVacina(req.body)
    res.status(201).json({ message: newAplicacao })
  }
  
  private async getAplicacaoById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const aplicacao = await AplicacaoVacinaRepository.getAplicacaoById(id)
      res.status(200).json(aplicacao)
    } catch (error) {
      res.status(404).json({ message: "Aplicação não encontrada!" })
    }
  }  

  private async getAplicacaoAnimal(req: Request, res: Response) {
    const animal_id = parseInt(req.params.animal_id)
    const aplicacoes = await AplicacaoVacinaRepository.getAplicacaoByAnimal(animal_id)
    res.status(200).json(aplicacoes)
  }

  private async getRecenteAplicacao(req: Request, res: Response) {
    console.log("Requisição para buscar as aplicações recentes recebida.");
  
    try {
      const aplicacoes = await AplicacaoVacinaRepository.getAplicacoesRcentes()
      res.status(200).json(aplicacoes);
    } catch (error) {
      console.error("Erro ao buscar as aplicações recentes:", error);
    }
  }
}

const aplicacaoVacinaController = new AplicacaoVacinaController().router

export default aplicacaoVacinaController
