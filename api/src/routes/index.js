const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const GenreRoutes = require('./genres');
const VideogameRoutes = require('./videogames');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/videogames", VideogameRoutes);  //lo dejo todo en videogames, pero cambia el método.
router.use('/genres', GenreRoutes);





module.exports = router;