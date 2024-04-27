const { Router } = require('express'); 
const Curso = require('../models/Curso');

const CursoController = require('../controllers/CursoController');

const cursoRoutes = new Router();

cursoRoutes.post('/', CursoController.cadastrar);
cursoRoutes.get('/',  CursoController.listar);

//Endpoint PUT - Atualizar curso por ID
cursoRoutes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ message: 'Curso não encontrado' })
        }

        curso.update(req.body)

        await curso.save()

        res.json(curso)
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o curso' })
    }
});

//Endpoint DELETE - Remover curso por ID
cursoRoutes.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        Curso.destroy({
            where: {
                id: id
            }
     })
        res.status(204).json({})
    } catch (error) {
        res.status(500).json('Não foi possível deletar o curso')
    }
});

module.exports = cursoRoutes