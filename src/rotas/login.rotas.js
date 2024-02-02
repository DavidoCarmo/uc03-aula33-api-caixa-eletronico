import { Router } from "express";

const router = Router()

const usuarios = [{
    email: 'fulano@gmail.com',
    senha: '123456'
}]

router.post("/login", (request, response) => {
    const { email, senha } = request.body

const usuario = usuarios.find((usuario) => usuario.email === email)

if(!usuario){
    response.send({error: "Usuario invalido"})
}
//GERAR JSON WEB TOKEN 
//DESENVOLVER PARA O USUARIO
if (usuario.senha === senha){
    response.send({message: "Usuario Autenticado"})
}else {
    response.send({message: "Usuario invalido"})
}

})



export default { router }