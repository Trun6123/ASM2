var express = require('express');
const ChildrentoyModel = require('../models/ChildrentoyModel');
const AdulttoyModel = require('../models/AdulttoyModel');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const childrentoy = await ChildrentoyModel.find()
    const adulttoy = await AdulttoyModel.find()
    const product = [...childrentoy, ...adulttoy]
    res.render('index', { product: product });
});
router.get('/detail/:id', async(req, res) => {
    const id = req.params.id;
    const childrentoy = await ChildrentoyModel.findById(id);
    const adulttoy = await AdulttoyModel.findById(id);

    if (childrentoy) {
        res.render('detail', { product: childrentoy }); // Corrected view name
    } else if (adulttoy) {
        res.render('detail', { product: adulttoy }); // Corrected view name
    } else {
        // Handle case where neither childrentoy nor adulttoy was found
        res.status(404).send('Product not found');
    }
});

module.exports = router;