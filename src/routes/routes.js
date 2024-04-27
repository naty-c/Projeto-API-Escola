const { Router } = require("express");
const alunoRoutes = require("./alunos.route");
const cursoRoutes = require("./cursos.route");
const loginRoutes = require("./login.route");
const matriculaRoutes = require("./matriculas.route");

const routes = Router();

routes.use('/alunos', alunoRoutes);
routes.use('/cursos', cursoRoutes);
routes.use('/login', loginRoutes);
routes.use('/matriculas', matriculaRoutes);

module.exports = routes;