const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const GenreRoutes = require('./genres');
const VideogameRoutes = require('./videogames');
const createVideogameRoute = require('./create')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/videogames", VideogameRoutes);  
router.use("/genres", GenreRoutes);
router.use("/create", createVideogameRoute);





module.exports = router;