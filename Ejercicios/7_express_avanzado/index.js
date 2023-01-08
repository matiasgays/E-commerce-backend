const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

let obj = {};

app.get('/api/frase',(req,res) => {
    const frase = 'Frase Inicial';
    obj = {...obj,frase};
    res.status(200).send(obj);
})

app.get('/api/palabras/:pos',(req,res) => {
    if (!obj.frase) return res.send(400);
    words = obj.frase.split(" ");
    const wordFound = words[req.params.pos - 1];
    if (!wordFound) return res.send(400);
    obj = {...obj,'buscada': wordFound}
    res.send(obj);
})

app.post('/api/palabras',(req, res) => {
    if (!obj.frase) return res.send(400);
    obj.frase += " " + req.body.palabra;
    obj = {...obj, agregada: req.body.palabra, pos: obj.frase.split(" ").length} 
    console.log(obj);
    res.send({status: "success", message: "word created"});
})

app.put('/api/palabras/:pos', (req, res) => {
    if (!obj.frase) return res.send(400);
    words = obj.frase.split(" ");
    const wordFound = words[req.params.pos - 1];
    if (!wordFound) return res.send(400);
    words[req.params.pos - 1] = req.body.palabra;
    obj.frase = words.toString().replaceAll(',',' ');
    obj = {...obj, actualizada: req.body.palabra, anterior: wordFound};
    console.log(obj);
    res.send({status: "success", message: "word created"});
})

app.delete('/api/palabras/:pos', (req, res) => {
    if (!obj.frase) return res.send(400);
    words = obj.frase.split(" ");
    const wordFound = words[req.params.pos - 1];
    if (!wordFound) return res.send(400);
    words.splice(req.params.pos - 1,1);
    obj.frase = words.toString().replaceAll(',',' ');
    console.log(obj);
    res.send({status: "success", message: "word created"});
})

app.listen(8080, console.log('Server listening in port http://localhost:8080/api/frase'));