const express = require('express');
const app = express();
app.use(express.json());

// Banco de dados em memória
let alunos = [
    { id: 1, nome: "Ana Souza" },
    { id: 2, nome: "Carlos Lima" }
];


// Listar todos os alunos (GET)
app.get('/alunos', (req, res) => {
    res.json(alunos);
});


// Buscar aluno pelo ID (GET)
app.get('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }

    res.json(aluno);
});


// Criar aluno (POST)
app.post('/alunos', (req, res) => {
    const { id, nome } = req.body;

    // Validação de campos
    if (!id || !nome) {
        return res.status(400).json({ mensagem: "ID e Nome são obrigatórios!" });
    }

    // Impedir ID duplicado
    if (alunos.some(a => a.id === id)) {
        return res.status(400).json({ mensagem: "ID já existente!" });
    }

    // Impedir nome duplicado
    if (alunos.some(a => a.nome.toLowerCase() === nome.toLowerCase())) {
        return res.status(400).json({ mensagem: "Nome já cadastrado!" });
    }

    const aluno = { id, nome };
    alunos.push(aluno);

    res.status(201).json({
        mensagem: 'Aluno cadastrado com sucesso!',
        aluno
    });
});


// Atualizar aluno pelo ID (PUT)
app.put('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }

    // Impedir nome duplicado em atualização
    if (alunos.some(a => a.nome.toLowerCase() === nome.toLowerCase() && a.id !== id)) {
        return res.status(400).json({ mensagem: "Nome já cadastrado para outro aluno!" });
    }

    alunos[index].nome = nome;

    res.json({
        mensagem: 'Aluno atualizado com sucesso!',
        aluno: alunos[index]
    });
});


// Deletar aluno pelo ID (DELETE)
app.delete('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }

    alunos.splice(index, 1);

    res.json({ mensagem: 'Aluno removido com sucesso!' });
});


// Iniciar servidor 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});