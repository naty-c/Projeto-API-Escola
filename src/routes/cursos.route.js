const { Router } = require('express'); 

const CursoController = require('../controllers/CursoController');

const cursoRoutes = new Router();

cursoRoutes.post('/', CursoController.cadastrar);
cursoRoutes.get('/',  CursoController.listar);
cursoRoutes.put('/:id', CursoController.atualizar);
cursoRoutes.delete('/:id', CursoController.deletar);

module.exports = cursoRoutes;