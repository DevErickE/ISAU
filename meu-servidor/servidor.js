const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistemagestaoisau"
});

// Verifica a conexão com o banco
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        return;
    }
    console.log("Conectado ao banco de dados!");
});

// Rota para cadastrar usuário
app.post("/usuario", async (req, res) => {
    const { login, senha } = req.body;  // Alterado para 'login' no lugar de 'nome'

    if (!login || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    try {
        // Criptografando a senha
        const hash = await bcrypt.hash(senha, 10);

        // Query de inserção ajustada
        const query = "INSERT INTO usuario (login, senha) VALUES (?, ?)";
        db.query(query, [login, hash], (err) => {
            if (err) {
                console.error("Erro ao executar a query:", err);
                return res.status(500).json({ message: "Erro ao cadastrar usuário." });
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
        });
    } catch (error) {
        console.error("Erro ao processar a senha:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
