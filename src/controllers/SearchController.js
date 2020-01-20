const Dev = require('../models/Dev')
const parseStringAsArray = require('../Utils/parseStringAsArray')


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query
        const techsArray = parseStringAsArray(techs)
        //console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //constant from mongo DB (mongoose)
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })
        console.log(request.query)
        return response.json( { devs})

    }
}