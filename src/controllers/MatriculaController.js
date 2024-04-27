const Aluno = require("../models/Aluno");
const Matricula = require("../models/Matricula");
const Curso = require("../models/Curso");

class MatriculaController {

    async cadastrar(req, res) {
        try {
            const aluno_id = req.body.aluno_id;
            const curso_id = req.body.curso_id;

            //Verifica se ID do aluno e do curso foram preenchidos
            if (!curso_id || !aluno_id) {
                return res
                    .status(400)
                    .json({ message: 'ID do aluno e do curso são obrigatórios' });
            }

            //Verifica se o aluno existe
            const alunoExistente = await Aluno.findByPk(aluno_id);
            if(!alunoExistente) {
                return res.status(404).json({message: 'O aluno nao existe'});
            }

            //Verifica se o curso existe
            const cursoExistente = await Curso.findByPk(curso_id);
            if(!cursoExistente) {
                return res.status(404).json({message: 'O curso nao existe'});
            }

            //Verifica se o aluno já está matriculado no curso
            const matriculaExistente = await Matricula.findOne({
                where: {
                    curso_id: curso_id,
                    aluno_id: aluno_id
                }
            })

            if(matriculaExistente) {
                return res.status(409).json({message: 'Aluno já matriculado no curso'});
            }

            //Registra a matrícula do aluno vinculada ao curso
            const matricula = await Matricula.create({
                aluno_id,
                curso_id
            });
            res.status(201).json(matricula)
        } catch (error) {
            res.status(500).json({message: 'Houve um erro ao cadastrar a matrícula'});
        }
    }
};

module.exports = new MatriculaController();