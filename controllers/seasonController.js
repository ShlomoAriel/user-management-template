const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.post('/api/find/SeasonTeam/all', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel('SeasonTeam', next)
    if(req.body == null || req.body == undefined || req.body == '') {
        res.status(400).json({status:400})
        return 
    }

    var filter = {}
    Object.keys(req.body.filter).forEach(function(key) {
        if(req.body.type == 'like') {
            filter[key] = new RegExp(req.body.filter[key], 'i')
        } else if (req.body.type == 'exactly') {
            filter[key] = req.body.filter[key]
        } 
    });

    require('../models/Player')
    require('../models/Team')
    require('../models/Season')
    

    entity.find(filter).
        populate('players season team').
        exec(function (err, story) {
            if (err) {
                next('find no good' + err);
            }
            console.log('The author is %s', story);
            res.json({result:story})
    });
});

router.get('/api/get/SeasonTeam/full/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = require('../models/SeasonTeam')
    if(req.body == null || req.body == undefined || req.body == '') {
        res.status(400).json({status:400})
        return 
    }

    require('../models/Player')

    entity.findOne({ _id: req.params.id }).
        populate('players team season').
        exec(function (err, story) {
            if (err) {
                next('find no good' + err);
            }
            console.log('The author is %s', story);
            res.json({"result":story})
    });
});

router.get('/api/get/SeasonTeam/Player/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = require('../models/SeasonTeam')
    var player = require('../models/Player')
    entity.findOne({ _id: req.params.id })
    .populate('players')
        .exec(function (err, entity) {
            if (err) {
                next('error retriving entity\n' + err);
            }
            else {
                console.log(entity.players);
                res.json(entity.players);
            }
        });
});

module.exports = router