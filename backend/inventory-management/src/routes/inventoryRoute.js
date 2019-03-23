const router = require('express').Router();

const ItemController = require('../controller/itemControl');

router.post('/update/:userID', ItemController.updateItemOfInventory);
router.get('/random', ItemController.getRandomLoot);
router.get('/inventory/:id', ItemController.getInventory);
router.get('/buyInventory', ItemController.getBuyInventory);


module.exports = router;
