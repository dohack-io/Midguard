const router = require('express').Router();

const ItemController = require('../controller/itemControl');

router.get('/id/:id', ItemController.getItemById);
router.get('/name/:name', ItemController.getItemByName);
router.get('/all', ItemController.getAllItems);


module.exports = router;
