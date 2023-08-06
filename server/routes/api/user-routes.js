const router = require('express').Router();
const userController = require('../../controllers/user-controller');

// Define routes and associate them with the appropriate controller functions
router.get('/user/:id', userController.getSingleUser);
router.post('/users', userController.createUser);
router.post('/login', userController.login);
router.put('/user/:id', userController.saveBook);
router.delete('/user/:id/:bookId', userController.deleteBook);

module.exports = router;
