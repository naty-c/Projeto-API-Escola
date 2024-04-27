const Curso = require("../models/Curso");

class CursoController {

    //Endpoint POST - Cadastrar cursos  
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome;
            const duracao_horas = req.body.duracao_horas;
    
            if (!nome) {
                return res.status(400).json({ message: "O nome é obrigatório" })
            }
    
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({
                    message: "A duração do curso deve ser entre 40 e 200 horas"
                })
            }
    
            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })
    
            res.status(201).json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não foi possível cadastrar o curso' })
        }

    }
};

module.exports = new CursoController();