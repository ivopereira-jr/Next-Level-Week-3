import express from "express"
import path from "path"
import cors from "cors"
import "express-async-errors"
//express-async-errors serve para ver error se der algum tem que instalar com npm ou yarn

import "./database/connection"

import routes from "./routes"
import errorHandler from "./errors/handles"

const app = express()

app.use(cors()) //serve para permitir liberar o acesso para tanto o front quanto outrs casos conseguir acessar o backend sem isso se for tenta fazer a coneçao com o front iria dar bug pois o back e frony estao em portas diferents
app.use(express.json())
app.use(routes)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))
app.use(errorHandler)

app.listen(3333)
