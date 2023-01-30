const videogameController = require('../controllers/videogames');
const {Router} = require('express');
const router = Router();


router.post('/', videogameController.post);


module.exports = router;