import express from 'express'
import  contaRotas  from './rotas/conta.rotas.js'
import mainRotas from './rotas/main.rotas.js'
import loginRotas from './rotas/login.rotas.js'
import { authorizeMiddleware } from './middlewares/auth.middleware.js'
import database from './database/index.js'



const app = express()
const port = process.env.PORT || 5000
 
app.use(express.json())

app.get("/status",mainRotas.status)
//importa as rotas de conta///
app.use('/contas',authorizeMiddleware, contaRotas.router )
app.use(loginRotas.router)

const db = database.getDB()

const contas = await db.query('SELECT * FROM banco.CONTAS')

console.log ('contas',contas)

app.listen(port, () => {
  console.log(`API radando na porta ${port}`)
});
 