const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');
const { hash } = require("bcryptjs");

const Aluno = connection.define('alunos', {
    nome: {
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    senha:{
        type: DataTypes.STRING,
    },
    telefone: {
        type: DataTypes.STRING,
    },   
    data_nascimento: {
        type: DataTypes.DATE
    }
});

//HOOK
Aluno.beforeSave(async (user) => {
    user.senha = await hash(user.senha, 8)
    return user
});

module.exports = Aluno;