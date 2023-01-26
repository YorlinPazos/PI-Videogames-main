const genreController = require('../controllers/genres');
const {Router} = require('express');
const router = Router();


// traigo todos los generos de la base de datos

router.get('/', genreController.getAll)

module.exports = router;