var express = require('express');
const ChildrentoyModel = require('../models/ChildrentoyModel');
var router = express.Router();

router.get('/', async(req, res) => {
    var childrentoys = await ChildrentoyModel.find();
    res.render('childrentoy/childrentoyList', { childrentoys: childrentoys });
});
router.get('/delete/:id', async(req, res) => {
    await ChildrentoyModel.findByIdAndDelete(req.params.id);
    res.redirect('/childrentoy');
});
router.get('/add', (req, res) => {
    res.render('childrentoy/childrentoyAdd');
});

router.post('/add', async(req, res) => {
    var childrentoy = req.body;
    await ChildrentoyModel.create(childrentoy)
        .then(console.log('Add new toy successfully !'))
        .catch(err => console.log(err));
    res.redirect('/childrentoy');
});
router.get('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var childrentoy = await ChildrentoyModel.findById(id);
    res.render('childrentoy/childrentoyEdit', { childrentoy: childrentoy });
});

router.post('/edit/:id', async(req, res) => {
    await ChildrentoyModel.findByIdAndUpdate(req.params.id, req.body)
        .then(console.log('Edit toy successfully !'))
        .catch(err => console.log(err));
    res.redirect('/childrentoy');
});

router.get('/sort/price/asc', async(req, res) => {
    var childrentoys = await ChildrentoyModel.find().sort({ price: 1 });
    res.render('childrentoy/childrentoyList', { childrentoys: childrentoys });
})

router.get('/sort/price/desc', async(req, res) => {
    var childrentoys = await ChildrentoyModel.find().sort({ price: -1 });
    res.render('childrentoy/childrentoyList', { childrentoys: childrentoys });
})

module.exports = router;