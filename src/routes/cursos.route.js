const { Router } = require('express'); 
const Curso = require('../models/Curso');

const CursoController = require('../controllers/CursoController');

const cursoRoutes = new Router();

cursoRoutes.post('/', CursoController.cadastrar);
cursoRoutes.get('/',  CursoController.listar);
cursoRoutes.put('/:id', CursoController.atualizar);

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