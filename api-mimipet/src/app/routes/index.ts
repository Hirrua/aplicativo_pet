import { Router } from "express";
import tutorController from "../controllers/tutor-controller";
import animalController from "../controllers/animal-controller";
import estoqueController from "../controllers/estoque-controller";
import vacinaController from "../controllers/vacina-controller";

const routers = Router()

routers.use("/tutores", tutorController)
routers.use("/animais", animalController)
routers.use('/estoques', estoqueController)
routers.use('/vacinas', vacinaController)

export default routers