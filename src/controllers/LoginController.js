const { compare } = require("bcryptjs");
const Aluno = require('../models/Aluno');
const { sign } = require('jsonwebtoken');

class LoginController {

    async login(req, res) {
        try {
            const email = req.body.email;
            const senha = req.body.senha;

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' });
            }

            if (!senha) {
                return res.status(400).json({ message: 'A senha é obrigatória' });
            }

            //Busca o aluno pelo email
            const aluno = await Aluno.findOne({
                where: { email: email }
            });

            //Verifica se o aluno existe
            if (!aluno) {
                return res.status(404).json({ message: 'Nenhum aluno corresponde ao email fornecido!' });
            }

            //Compara senhas com as senhas hasheadas do bcryptjs
            const senhaValida = await compare(senha, aluno.senha);

            if(senhaValida === false) {
                return res.status(403).json({message: 'Senha inválida!'});
            }

            //Verifica autenticação
            const payload = { sub: aluno.id, email: aluno.email, nome: aluno.nome };

            const token = sign(payload, process.env.SECRET_JWT, {
                expiresIn: '24h'
            });

            res.status(200).json({ Token: token });

        } catch (error) {
            return res.status(500).json({ error: error, message: 'Algo deu errado!' });
        }
    }
}

module.exports = new LoginController();