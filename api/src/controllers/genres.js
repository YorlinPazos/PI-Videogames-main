const axios = require('axios');
const { Genre } = require("../db");
const ModelCrud = require('./index');
const { API_KEY } = process.env;



class GenresModel extends ModelCrud {
    constructor(model) {
        super(model)
    }

    getAll = async (req, res, next) =>{
                 
        //Empiezo preguntando si hay info en la db, si da true la retorno y corto.

                const dbLog = await this.model.findAll({
                    attributes: ['name'],
                })
        try {
            let dbClear = dbLog.map(el => {
                return{
                   name: el.name
                }
            })
            if(dbClear.length) return res.send(dbClear)
            
                        //si no había info en mi database me voy a la API
            const response = await axios.get((`https://api.rawg.io/api/genres?key=${API_KEY}`))
            const genres = response.data.results;      
            for (let i = 0; i < genres.length; i++){  //itero en mi resultado de la api.
                const genreFor = genres[i]
                await this.model.findOrCreate({       //y por si las dudas, si algo no existe lo crea
                    where: {
                        name: genreFor.name
                     } 
                });
            }
            res.send(genres) 
        } catch (error) {
              next(error)
           }
        
    }
   
}
        
const genreController = new GenresModel(Genre);

module.exports = genreController;