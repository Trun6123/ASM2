var express = require('express');
const AdulttoyModel = require('../models/AdulttoyModel');
var router = express.Router();

router.get('/', async(req, res) => {
    var adulttoys = await AdulttoyModel.find();
    res.render('adulttoy/adulttoyList', { adulttoys: adulttoys });
});
router.get('/delete/:id', async(req, res) => {
    await AdulttoyModel.findByIdAndDelete(req.params.id);
    res.redirect('/adulttoy');
});
router.get('/add', (req, res) => {
    res.render('adulttoy/adulttoyAdd');
});

router.post('/add', async(req, res) => {
    var adulttoy = req.body;
    await AdulttoyModel.create(adulttoy)
        .then(console.log('Add new toy successfully !'))
        .catch(err => console.log(err));
    res.redirect('/adulttoy');
});
router.get('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var adulttoy = await AdulttoyModel.findById(id);
    res.render('adulttoy/adulttoyEdit', { adulttoy: adulttoy });
});

router.post('/edit/:id', async(req, res) => {
    await AdulttoyModel.findByIdAndUpdate(req.params.id, req.body)
        .then(console.log('Edit toy successfully !'))
        .catch(err => console.log(err));
    res.redirect('/adulttoy');
});

router.get('/sort/quantity/asc', async(req, res) => {
    var adulttoys = await AdulttoyModel.find().sort({ aquantity: 1 });
    res.render('adulttoy/adulttoyList', { adulttoys: adulttoys });
})

router.get('/sort/quantity/desc', async(req, res) => {
    var adulttoys = await AdulttoyModel.find().sort({ aquantity: -1 });
    res.render('adulttoy/adulttoyList', { adulttoys: adulttoys });
})

module.exports = router;