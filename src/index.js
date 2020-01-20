const express = require('express');//importando o módulo express
const mongoose = require('mongoose');
const app = express();//aplicação criada usando a função express
const routes = require('./routes'); //importo o arquivo com o caminho relativo


mongoose.connect('mongodb+srv://zuleide:zuleideteste4657@cluster0-n52rl.gcp.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology: true,
});

//O use é um comando que precisa ser declarado de forma hierárquica de uso (linear)
app.use(express.json());//digo para o express algo que vai ser válido para toda as rotas
app.use(routes);
//express parametros:

//Query params: request.query (Filtros, ordenação, paginação,...)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

/*
app.get('/',(request,response)=> {
    //return response.send('Hello');
    return response.json({ message: 'Hello batatas'});//retorno um obj json
}); //rota inicial da aplicação (os parâmetros da arrow function é prenchida pelo express)
*/
app.listen(3000);//definindo a porta de escuta



