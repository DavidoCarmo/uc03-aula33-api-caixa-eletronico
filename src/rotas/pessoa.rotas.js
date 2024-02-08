import { Router, response } from "express";
import database from "../database/index.js";
import { authorizeMiddleware } from '../middlewares/auth.middleware.js'
import pessoaController from '../controllers/pessoas.controller.js'


const router = Router()


// Cadastro de pessoas
router.post("/login",pessoaController.login )

router.post('/cadastrar', pessoaController.cadastrar )

router.patch('/:pessoa_id/atualizar', authorizeMiddleware,pessoaController.atualizar )
export default { router }