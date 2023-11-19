import { Router } from 'express';

const usersRouter = Router();

const express = require('express');
const app = express();
const port = 3000;

usersRouter.use(express.json());

let produtos = [
    { _id: 1, nome: 'Tijolo', qtdeEstoque: 1000, preco: 0.90 },
    { _id: 2, nome: 'Cimento', qtdeEstoque: 200, preco: 25.00 },
];

class Produto {
    _id: number;
    nome: string;
    qtdeEstoque: number;
    preco: number

    constructor(id: number, nome: string, qtdeEstoque: number, preco: number) {
        this._id = id;
        this.nome = nome;
        this.qtdeEstoque = qtdeEstoque;
        this.preco = preco;
    }
}

usersRouter.get('/', (req, res, next) => {
    res.json({ apiName: 'Catálogo de Produtos!', greetingMessage: 'Bem-Vindo!' });
})

usersRouter.post('/produtos', (req, res, next) => {
    try {
        if (req.body.nome) {
            const { nome, qtdeEstoque, preco } = req.body; //Desestruturação

            const id = produtos.length > 0 ? produtos[produtos.length - 1]._id + 1 :1;
            // Instanciando objeto da classe Produto
            const novoProduto = new Produto(id, nome, qtdeEstoque, preco);
            // Adicionando o objeto instanciado no final do vetor produtos
            produtos.push(novoProduto);
            res.json({ message: 'Produto cadastrado com sucesso!' });
        } else {
            res.json({ message: 'Dados incorretos. NÃO FOI POSSÍVEL cadastrar o produto!' });
        }
    } catch (error) {
        res.status(400).json({ erro: `${error}` });
    }
})
// READ ALL - Consultar/Listar todos os produtos
usersRouter.get('/produtos', (req, res, next) => { res.json(produtos); })
// READ - Consultar detalhe do produto
usersRouter.get('/produtos/:id', (req, res, next) => {
    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);
            // O método find() retorna o primeiro valor do array, se
            // um elemento do array atender à função de teste fornecida.
            // Caso contrário, retorna undefined.
            const produto = produtos.find(elemento => elemento._id === id);
            if (produto) {
                res.json(produto);
            }
            else {
                res.json({ message: 'Produto não encontrado!' });
            }
        }
    } catch (error) {
        res.status(400).json({ erro: `${error}` });
    }
})
// UPDATE - Alterar produto
usersRouter.put('/produtos/:id', (req, res, next) => {
    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);
            const { nome, qtdeEstoque, preco } = req.body; //Desestruturação
            // O método find() retorna o primeiro valor do array, se
            // um elemento do array atender à função de teste fornecida.
            // Caso contrário, retorna undefined.
            const produto = produtos.find(elemento => elemento._id === id);
            //const novoProduto = {...produto,nome,qtdeEstoque,preco}

            if (produto) {
                produto.nome = nome;
                produto.qtdeEstoque = qtdeEstoque;
                produto.preco = preco;
                res.json({ message: 'Produto alterado com sucesso!' });
            }
            else {
                res.json({ message: 'Produto não encontrado!' });
            }
        }
    } catch (error) {
        res.status(400).json({ erro: `${error}` });
    }
})
// DELETE - Excluir produto
usersRouter.delete('/produtos/:id', (req, res, next) => {
    try {
        if (req.params.id) {
            if (req.params.id) {
                const id = parseInt(req.params.id);
                // O método filter() gera um novo array apenas com os elementos
                // que satisfazem à função de teste fornecida
                // Atualizando o vetor produtos (excluindo no produto solicitado)
                produtos = produtos.filter((elemento) => elemento._id !== id);
                console.log("produtos: ", JSON.stringify(produtos));
                res.json({ message: 'Produto excluído com sucesso!' });
            }
            else {
                res.json({ message: 'Dados incorretos. NÃO FOI POSSÍVEL excluir o produto!' });
            }
        }
    } catch (error) {
        res.status(400).json({ erro: `${error}` });
    }
})

export default usersRouter;

app.use('/', usersRouter);

app.listen(port,
    () => console.log(`API "Catálogo de Produtos" rodando na porta ${port}`)
);