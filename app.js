import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { getAluno, getAlunos, createAluno } from './database.js'

const app = express();

app.use(bodyParser.json());

app.use(cors())

// Endpoint de healthcheck
app.get("/health", (req, res) => {
    res.status(200).send("Servidor está funcionando corretamente.");
});

app.get("/alunos", async (req,res) => {
    const alunos = await getAlunos();
    res.send(alunos);
});

app.get("/aluno/:id", async (req,res) => {
    const id = req.params.id;
    const aluno = await getAluno(id);
    res.send(aluno);
});

app.post("/alunos", async (req,res) => {
    const { nome, idade, cidade } = req.body
    const aluno = await createAluno(nome, idade, cidade)
    res.status(201).send(aluno);
});

app.listen(8080, () => {
    console.log('O servidor está executando na porta 8080');
});