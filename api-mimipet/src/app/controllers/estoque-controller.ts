import { Request, Response, Router } from "express";
import EstoqueRepository from "../repositories/estoque-repository";

class EstoqueController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllEstoque)
    this.router.post('/', this.createEstoque)
    this.router.put('/:id', this.updateEstoque)
    this.router.delete('/:id', this.removeEstoque)
  }

  private async getAllEstoque(req: Request, res: Response) {
    const estoques = await EstoqueRepository.getEstoque()
    res.status(200).json(estoques)
  }

  private async createEstoque(req: Request, res: Response) {
    const newEstoque = await EstoqueRepository.postEstoque(req.body)
    res.status(201).json(newEstoque)
  }

  private async updateEstoque(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const estoqueUpdate = await EstoqueRepository.putEstoque(id, req.body)
    res.status(200).json(estoqueUpdate)
  }

  private async removeEstoque(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const estoqueRemove = await EstoqueRepository.deleteEstoque(id)
    res.status(200).json(estoqueRemove)
  }
}

const estoqueController = new EstoqueController().router

export default estoqueController