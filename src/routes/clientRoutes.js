const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, isAdmin, clientController.getAllClients);  // Somente admin
router.post('/', clientController.createClient);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.get('/:id/balance', verifyToken, clientController.getClientBalance);

module.exports = router;
