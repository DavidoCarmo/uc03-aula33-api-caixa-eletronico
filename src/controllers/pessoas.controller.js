import { randomUUID } from "node:crypto"
import database from "../database/index.js";
import jwtUtils from '../utils/jwt.utils.js'
class PessoaController {
  async cadastrar(request, response) {


    const { nome_completo, cpf, usuario, senha } = request.body
    console.log(nome_completo, cpf, usuario, senha)
    const db = database.getDB()

    const pessoaExiste = await db.oneOrNone(
      `SELECT * 
         FROM banco.PESSOAS 
         WHERE banco.PESSOAS.deleted_at is null 
           AND banco.PESSOAS.cpf = $1`,
      [cpf])



    if (pessoaExiste) {
      response.status(403).send({ message: "já existe um cadastro de pessoa com esse CPF" })
      return
    }

    const pessoa = await db.one(
      `INSERT INTO banco.PESSOAS (pessoa_id, nome_completo, cpf, usuario, senha, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING pessoa_id`,
      [randomUUID(), nome_completo, cpf, usuario, senha, new Date(), new Date()]
    )

    response.send({
      message: "Cadastro de pessoa criado com sucesso",
      pessoa_id: pessoa.pessoa_id
    })
  }

  async login(request, response) {
    const { usuario, senha } = request.body

    const db = database.getDB()

    const pessoa = await db.oneOrNone(
      `SELECT * 
           FROM banco.PESSOAS 
           WHERE banco.PESSOAS.deleted_at is null 
             AND banco.PESSOAS.usuario = $1`,
      [usuario])

    if (!pessoa) {
      response.send({ error: "Usuário inválido" })
    }

    if (pessoa.senha === senha) {
      // gera o JWT - JSON Web Token
      const payload = {
        pessoa_id: pessoa.pessoa_id,
        privilegio: pessoa.privilegio
      }
      const token = jwtUtils.generateToken(payload)

      response.send({
        message: "Usuário autenticado",
        jwt: token
      })
    } else {
      response.send({ error: "Usuário inválido" })
    }

  }


  async atualizar(request, response) {
    //obter do body os campos para atualizar
    const { nome_completo, cpf, usuario, senha, privilegio } = request.body;
    const { session } = request;
    const { pessoa_id } = request.params



    // vai verificar se existe uma conta com este id
    const pessoa = await db.oneOrNone(
      `SELECT * 
           FROM banco.PESSOAS 
           WHERE banco.PESSOAS.deleted_at is null 
             AND banco.PESSOAS.pessoa_id = $1`,
      [usuario])

    if (!pessoa) {
      response.send({
        error: "Cadastro pessoa nao encontrada",
        pessoa_id
      })
    }



    //validar  se é a propria pessoa que esta logada fazendo a atualização
    if (session.pessoa_id === pessoa_id) {
    };


    //pode atualizar nome completo cpf nome do usuario e senha
    //condicao ? valor ser verdadeiro : valor se falso
    // pessoa.nome_completo !== nome_completo ? nome_completo : pessoa.nome_completo,

    pessoa.nome_completo !== nome_completo ? nome_completo : pessoa.nome_completo,
      pessoa.cpf !== cpf ? cpf : pessoa.cpf,
      pessoa.usuario !== usuario ? usuario : pessoa.usuario,
      pessoa.senha !== senha ? senha : pessoa.senha,


      /////////////////////////////////////////////////
      await db.none(
        `UPDATE banco.PESSOAS
       SET nome_completo = 1$, cpf = $2, usuario = $3, senha = $4, updated_at = $5
       WHERE pessoa_id = $6`,
        [
          parametros_update.nome_completo,
          parametros_update.cpf,
          parametros_update.usuario,
          parametros_update.senha,
          new Date(),
          pessoa_id
        ]
      )

    //senão atualizar se a pessoa e um bancario ou admin


    //atualizar o registro
  }
}




export default new PessoaController();