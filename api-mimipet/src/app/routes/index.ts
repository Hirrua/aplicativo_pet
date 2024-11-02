import { Router } from "express";
import tutorController from "../controllers/tutor-controller";
import animalController from "../controllers/animal-controller";

const routers = Router()

routers.use("/tutores", tutorController)
routers.use("/animais", animalController)

export default routers