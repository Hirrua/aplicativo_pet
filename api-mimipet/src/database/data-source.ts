import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import { CreateAnimalTable1727907553003 } from "./migrations/1727907553003-CreateAnimalTable"
import { CreateTutorTable1727797219467 } from "./migrations/1730248986907-CreateTableTutores"
import { CreateTableEstoque1730389826488 } from "./migrations/1730389826488-CreateTableEstoque"
import { CreateTableVacina1730389826489 } from "./migrations/1730557378240-CreateTableVacina"
import { CreateTableAplicacaoVacina1730389836490 } from "./migrations/1730558780322-CreateTableAplicacao"
import { UpdateTableVacina1730563025175 } from "./migrations/1730563025175-UpdateTableVacina"
import { UpdateNewColumnVacina1730567406529 } from "./migrations/1730574893220-UpdateColumnVacina"
import Tutor from "../app/entities/tutor"
import Animal from "../app/entities/animal"
import Vacina from "../app/entities/vacinas"
import Estoque from "../app/entities/estoque"
import AplicacaoVacina from "../app/entities/aplicacao"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "mimipet",
    synchronize: true,
    logging: false,
    entities: [Tutor,Animal, Vacina, Estoque, AplicacaoVacina],
    migrations: [CreateTutorTable1727797219467, CreateAnimalTable1727907553003, CreateTableVacina1730389826489, CreateTableEstoque1730389826488, CreateTableAplicacaoVacina1730389836490, UpdateTableVacina1730563025175, UpdateNewColumnVacina1730567406529],
    subscribers: [],
})
