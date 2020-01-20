const axios = require('axios');//permite a chamada a outras APIs
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray')


//index, show, store, update, destroy -- mátodos de um controller


module.exports = {

    async index(request, response){
        const devs = await Dev.find()
        return response.json(devs)
    },



    async store(request,response) {
    
        const { github_username, techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({ github_username })
        if(!dev){
            //para usar template Strings (uso de variáveis dentro do texto) usa-se a crase
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            //console.log(apiResponse.data);
            const { name = login, avatar_url, bio } = apiResponse.data; //se name não existir, pega o valor do login
        
            //console.log(name, avatar_url, bio, github_username);
           const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
        return response.json(dev);//retorno um obj json
    },

    async update(request,response) {
        const { _id, techs , latitude, longitude  } = request.body;
    
        const dev = await Dev.findById({ _id })

        if(dev){

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev.location = location
            dev.techs = parseStringAsArray(techs)
            //console.log(dev.techs)
            //console.log(dev.location)

            try{
                await dev.save()
            }
            catch(e){
                console.log(e)
            }
        }
        //console.log(dev)
        return response.json(dev);//retorno um obj json
    },

    async destroy(request, response){
        const { _id } = request.body;
        const dev = await Dev.findById({_id})
        console.log(dev)
        if(dev){
            try{
                await Dev.deleteOne({ _id });
                console.log("Dev deletado")
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            console.log("Dev não existe")
        }
        return response.json(Dev.deletedCount)
    },
};