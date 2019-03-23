const router = require('express').Router();

const ItemController = require('../controller/itemControl');

router.post('/remove/:userId/:item', ItemController.removeItemFromInventory);
router.post('/add/:userId/:item', ItemController.addItemToInventory);
router.get('/random', ItemController.getRandomLoot);
router.get('/inventory', ItemController.getInventory);
router.get('/buyInventory', ItemController.getBuyInventory);


module.exports = router;
