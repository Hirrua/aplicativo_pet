import { Request, Response, Router } from "express";
import VacinaRepository from "../repositories/vacinas-repository";

class VacinaController {
  public router: Router

  constructor(){
    this.router = Router()
    this.initialize()
  }

  private initialize(){
    this.router.get('/', this.getAllVacina)
    this.router.post('/', this.createVacina)
    this.router.put('/:id', this.updateVacina)
    this.router.delete('/:id', this.removeVacina)
  }

  private async getAllVacina(req: Request, res: Response){
    const vacinas = await VacinaRepository.getVacina()
    res.status(200).json(vacinas)
  }

  private async createVacina(req: Request, res: Response) {
    const newVacina = await VacinaRepository.postVacina(req.body)
    res.status(201).json(newVacina)
  }

  private async updateVacina(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const vacinaUpdate = await VacinaRepository.putVacina(id, req.body)
    res.status(200).json(vacinaUpdate)
  }

  private async removeVacina(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const vacinaRemove = await VacinaRepository.deleteVacina(id)
    res.status(200).json(vacinaRemove)
  }
}

const vacinaController = new VacinaController().router

export default vacinaController