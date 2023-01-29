const axios = require('axios');
const { Videogame, Genre} = require("../db");
const ModelCrud = require('./index');
const { API_KEY } = process.env;
const { Op } = require('sequelize')


class VideogameModel extends ModelCrud {
    constructor(model) {
        super(model)
    }                              // Búsqueda por ID

    getById = async (req, res, next) =>{

        const id = req.params.id;  
        try {
        if(isNaN(id)){     // Si NO es un numero, busca en la Base de datos
          
            let videogameIdDb = await this.model.findOne({
                attributes: ['name','id', 'description', 'image', 'released', 'rating', 'platforms'],
                where: {
                    id: id     //Localizo donde el id del modelo sea = id por params
                },
                include: [{
                    model: Genre
                }] 
            });
                if(videogameIdDb){
                  res.send(videogameIdDb)
                  }  
                  else{
                   res.status(404).json({message: 'El videojuego no existe en la Base de datos'})
                }                      
        };

        if(!isNaN(id)){              //  si SI es un número busca en API
            let vgIdApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            if(vgIdApi != undefined){
                let vgResultApi = {
                id: vgIdApi.data.id,
                name: vgIdApi.data.name,
                description: vgIdApi.data.description,
                released: vgIdApi.data.released,      
                image: vgIdApi.data.background_image,
                rating: vgIdApi.data.rating,
                platforms: vgIdApi.data.platforms.map(el => el.platform.name),
                genres: vgIdApi.data.genres.map(el => el.name)
            }
            if(id == vgIdApi.data.id){               //**.Tengo esto pendiente.**//
                res.send(vgResultApi)
                }
                else{
                    res.status(404).json({message: 'El videojuego no existe en la API'})
                    }  
            }
             
       }    
          }                  // Si el usuario introduce una ID que ni al chiste, hay tabla. xD
          catch (error) {
           res.status(404).json({error:'No se indrodujo una ID válida'})
          }  
    };
                                         //Búsqueda por Nombre           
                                    
    getAll = async (req, res, next) => {
        
        if(req.query.name){
            let name = req.query.name.toLowerCase()
            try {                      //busco en la database, y traigo sólo las propiedades que quiero. 
                let queryGameDB = await this.model.findAll({
                    attributes: ['id', 'name','image','rating'],
                    where:{
                        name : {
                            [Op.iLike]: `%${name}%`  
                        },
                    },
                    include: [{
                        model: Genre             //vinculo el género a mi busqueda por bdd
                    }]          
                });
                let queryApiName = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
                Promise.all([queryGameDB, queryApiName])
                .then((results)=>{
                    let [queryGameDBResult, queryApiNameResult] = results;
                    let resultApi = queryApiNameResult.data.results.map(el => { //* Promise all reiterativo, revisar!!! *//
                        return {
                            name: el.name,
                            genres: el.genres.map((el)=> el.name), 
                            id: el.id,
                            rating: el.rating,
                            image: el.background_image,
                        }
                    })
                    const response = queryGameDBResult.concat(resultApi)
                    if(response.length){
                        res.send(response.slice(0, 15))  // Me pedían sólo los 15 primeros resultados
                    }else{
                        return res.status(404).json(`No se encontro ningun videojuego con el nombre "${req.query.name}"`);
                    }
                })
               
            }catch (error) {
                next(error)
            }
        }                                
                              // si no hay query trae todo, tanto de bdd como de la api
        else if (!req.query.name) {
            try{
                const videogameDB = await this.model.findAll({
                    attributes: ['id','name', 'image', 'rating', 'createdInDB'],
            include: [{
                model: Genre,
                attributes: ["name"],
                        through: {
                        attributes: [],
                    },
                }] 
            });

            const genreName = videogameDB.map(el => {
                return{
                    name: el.name,
                    genres: el.genres.map((el)=> el.name),
                    id: el.id,  
                    image: el.image, 
                    rating: el.rating,
                    createdInDB: el.createdInDB
                }
            });
            
            let results = [...genreName] //Traigo lo que tengo en bdd
            
            let pages = 0;
            let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            while(pages < 5){ //obtener 100 resultados.
                pages++;
                const gamesMap = response.data.results.map(el => {
                    return {
                        name: el.name,
                        genres: el.genres.map((el)=> el.name),
                        id: el.id,  
                        image: el.background_image, 
                        rating: el.rating,
                    }
                })
                results = [...results, ...gamesMap]  //concateno api y bdd con el spread operator.
                response = await axios.get(response.data.next)
            }; res.status(200).json(results)
               console.log(results.length)
               } 
                catch (error) {
                next(error);
             }
        }
    };                                 // Crear videogame
                           
    post = async (req, res, next) => {
                    
        let {name, description, released, rating, platforms, image, genres} = req.body;
        
                  // Valido que me llegue la info necesaria, incluso que el rating tenga el rango válido. 
        if(!req.body.name ) return res.status(400).json({message: 'El campo name es obligatorio'})
        if(!req.body.description) return res.status(400).json({message: 'El campo description es obligatorio'})
        if(!req.body.platforms) return res.status(400).json({message: 'El campo platforms es obligatorio'})
        if(!req.body.genres) return res.status(400).json({message: 'El campo genres es obligatorio'})
        if(rating < 0 || rating > 5) return res.status(400).json({message: 'El rating debe ser un numero entre 1 y 5. EJEMPLO: 4.5'})
        if(req.body.name){
        try {
            let videogameCreated = await this.model.create({
                name,
                description,
                released,
                rating,
                image,
                platforms
            })
            let genresDb = await Genre.findAll({
                where: {
                        name : genres // si del genre sea igual que el del body, se agrega
                    }, 
        });
            videogameCreated.addGenre(genresDb)
            res.status(201).json({
                data: videogameCreated,
                message: 'El Videojuego ha sido creado exitosamente'
            }) 
    }   catch (error) {
            next(error)
            }
       }
       
    }
};
        

  
const videogameController = new VideogameModel(Videogame);

module.exports = videogameController;