import { Request, Response, Router } from "express";
import TutorRepository from "../repositories/tutor-repository";
import authenticationMiddleware from "../middlewares/auth-middleware";

class TutorController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllTutores)
    this.router.get('/:id', this. getTutor)
    this.router.post('/', this.createTutor)
    this.router.put('/:id', authenticationMiddleware, this.updateTutor)
    this.router.delete('/:id', authenticationMiddleware, this.removeTutor)
    this.router.post('/auth', this.authTokenTutor)
  }

  private async getAllTutores(req: Request, res: Response) {
    const tutores = await TutorRepository.getTutor()
    res.status(200).json(tutores)
  }

  private async getTutor(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const tutor = await TutorRepository.getOneTutor(id)
    res.status(200).json(tutor)
  }

  private async createTutor(req: Request, res: Response) {
    const newTutor = await TutorRepository.postTutor(req.body)
    res.status(201).json(newTutor)
  }

  private async updateTutor(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const updateTutor = await TutorRepository.putTutor(id, req.body)
    res.status(200).json(updateTutor)
  }

  private async removeTutor(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const tutorRemove = await TutorRepository.deleteTutor(id)
    res.status(200).json(tutorRemove)
  }

  private async authTokenTutor(req: Request, res: Response) {
    const token = await TutorRepository.authTutor(req.body)
    res.status(201).json({ token })
  }
}

const tutorController = new TutorController().router

export default tutorController