import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getAluno, getAlunos, createAluno } from './database.js';
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Endpoint raiz
app.get("/", (req, res) => {
    res.status(200).send("Servidor está funcionando corretamente.");
});

// Endpoint de healthcheck
app.get("/health", (req, res) => {
    res.status(200).send("Servidor está funcionando corretamente.");
});

app.get("/alunos", async (req, res, next) => {
    try {
        const alunos = await getAlunos();
        res.send(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

app.get("/aluno/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const aluno = await getAluno(id);
        res.send(aluno);
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

app.post("/alunos", async (req, res, next) => {
    try {
        const { nome, idade, cidade } = req.body;
        const aluno = await createAluno(nome, idade, cidade);
        res.status(201).send(aluno);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Ocorreu um erro interno no servidor.',
        error: err.message,
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`O servidor está executando na porta ${APP_PORT}`);
});
