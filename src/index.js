const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'senai',
    port: 5432 

});

app.use(cors());
app.use(express.json());

app.get('/livros', async (req,res) =>{
    try{
         const result = await pool.query('select * from livros');
         res.json(result.rows)
    }catch(err){
        console.log(err.message);
        res.status(500).json({error: "erro ao buscar livros"})

    }
})

app.get('/livros/:codigo', async (req,res) => {
    const{ codigo } = req.params;
    try{
        const result = await pool.query('select * from livros were codigo = $1', [codigo])
        if(result.rows.leght === 0){
            return res.status(404).json({error: 'livro não encontrado'})

        }
        res.json(result.rows[0])
    }catch (err){
        console.log(errm.message);
        res.status(500).json({error: 'esse livro não existe'})
    }
})

app.listen(3000, () => {
    console.log("servidor rodando gostoso na porta 3000");
})