import { Request, Response, Router } from "express";
import AnimalRepository from "../repositories/animal-repository";
import authenticationMiddleware from "../middlewares/auth-middleware";

class AnimalController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', authenticationMiddleware, this.getAllAnimal)
    this.router.get('/:id', authenticationMiddleware, this.getAnimal)
    this.router.post('/', authenticationMiddleware, this.createAnimal)
    this.router.put('/:id', authenticationMiddleware, this.updateAnimal)
    this.router.delete('/:id', authenticationMiddleware, this.removeAnimal)
  }

  private async getAllAnimal(req: Request, res: Response) {
    const animais = await AnimalRepository.getAnimal()
    res.status(200).json(animais)
  }

  private async getAnimal(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const animal = await AnimalRepository.getOneAnimal(id)
    res.status(200).json(animal)
  }

  private async createAnimal(req: Request, res: Response) {
    const newAnimal = await AnimalRepository.postAnimal(req.body)
    res.status(201).json(newAnimal)
  }

  private async updateAnimal(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const animalUpdate = await AnimalRepository.putAnimal(id, req.body)
    res.status(200).json(animalUpdate)
  }

  private async removeAnimal(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const animalRemove = await AnimalRepository.deleteAnimal(id)
    res.status(200).json(animalRemove)
  }
}

const animalController = new AnimalController().router

export default animalController