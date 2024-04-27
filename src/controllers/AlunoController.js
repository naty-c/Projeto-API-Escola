const Aluno = require('../models/Aluno');

class AlunoController {

    //Endpoint POST - Cadastrar alunos (rota pública)
    async cadastrar(req, res) {
        try {

            const nome = req.body.nome;
            const email = req.body.email;
            const senha = req.body.senha;
            const data_nascimento = req.body.data_nascimento;
            const telefone = req.body.telefone;

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' });
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' });
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato YYYY-MM-DD' });
            }

            const aluno = await Aluno.create({
                email: email,
                senha: senha,
                nome: nome,
                data_nascimento: data_nascimento,
                telefone: telefone
            })

            res.status(201).json(aluno);

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não foi possível cadastrar o aluno' });
        }
    }

    //Endpoint GET - Listar todos os alunos (rota privada)
    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll()
            res.json(alunos)
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível listar os alunos' });
        }
    } 

    //Endpoint GET - Listar aluno por ID (rota privada)
    async listarUm(req, res) {
        try {

            const { id } = req.params

            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado!" });
            }

            res.json(aluno)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não foi possível listar o aluno específico',
                error: error
            })
        }
    }

    //Endpoint PUT - Atualizar aluno por ID (rota privada)
    async atualizar(req, res) {
        try {
            const { id } = req.params;
    
            const aluno = await Aluno.findByPk(id);
    
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado!' });
            }
    
            await aluno.update(req.body);
    
            await aluno.save();
    
            res.status(200).json(aluno);
    
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível atualizar o aluno' });
        }
    }

    //Endpoint DELETE - Remover aluno por ID (rota privada)
    async deletar(req, res) {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);
    
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado!' });
        }
    
        await aluno.destroy();

        return res.status(204).json({});
    }
};

module.exports = new AlunoController();
