const videogameController = require('../controllers/videogames');
const {Router} = require('express');
const router = Router();

router.get('/:id', videogameController.getById);
router.get('/', videogameController.getAll);
router.post('/', videogameController.post);
router.put('/:id', videogameController.update);
router.delete('/:id', videogameController.delete);

module.exports = router;