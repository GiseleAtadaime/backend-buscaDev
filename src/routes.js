const { Router} = require('express'); //usa-se {} para importar apenas uma coisa específica (um módulo)
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.delete('/devs', DevController.destroy);
routes.put('/devs', DevController.update);
routes.get('/devs', DevController.index);
//rota para cadastro de devs
routes.post('/devs', DevController.store); 

routes.get('/search', SearchController.index);

module.exports = routes; //exporta as rotas criadas neste arquivo para a aplicação