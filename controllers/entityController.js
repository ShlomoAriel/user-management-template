const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.post('/api/addEntity', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entityModel = getEntityModel(req.body.entityName, next)
    var entity = new entityModel(req.body.entity)
    entity.save((err, newEntity) => {
        if (err) {
            return next(err);
        }
        res.status(200).send('OK');
    });
});

router.get('/api/getEntity/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.query.entityName, next)   
    entity.findOne({ _id: req.params.id })
        .exec(function (err, entity) {
            if (err) {
                next('error retriving entity\n' + err);
            }
            else {
                console.log(entity);
                res.json(entity);
            }
        });
});

router.get('/api/getEntities', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    var entityName = req.query.entityName
    if(entityName){
        var entities = await getEntitiesBy(entityName, next)
        if(entities){
            res.json(entities);            
        }
    }
});

router.put('/api/updateEntity', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.body.entityName, next)
    entity.findOneAndUpdate(
        { _id: req.body.entity._id },
        req.body.entity,
        { upsert: true , new: true, returnOriginal: false},
        function (err, newEntity) {
            if (err) {
                next('Error updating Entity\n' + err);
            }
            else {
                res.json(newEntity);
            }
        });
});

router.delete('/api/deleteEntity/:id/:entityName', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    if (!req.params.entityName || !req.params.id) {
        next('Error deleting Entity\n' + err);
    }
    var entity = getEntityModel(req.params.entityName, next)
    entity.findOneAndRemove(
        { _id: req.params.id },
        function (err, newEntity) {
            if (err) {
                next('Error deleting Entity\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

router.get('/api/findEntityLike', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.body.entityName, next)
    entity.find(function (err, entities) {
        if (err) {
            next('find no good' + err);
        }
        else {
            var searchString = req.param('searchString');
            let objectArray = _.filter(entities, function (o) {
                return o.name.includes(searchString);
            });
            res.json(objectArray);
        }
    });
});
async function getEntitiesBy(name, next){
    var entity = getEntityModel(name, next)
    return entity.find(function (err, entities) {
        if (err) {
            next('getEntities no good' + err)
        }
        else {
            return(entities)
        }
    })
}

function getEntityModel(name, next){
    var entityName = name
    if(!entityName){
        next('Entity Name no good');
    }
    try {
        var entity = require('../models/' + entityName)
    }
    catch (err) {
        next('Entity path ./models/' + entityName + ' not found\n' + err)
    }
    return entity
}
    module.exports = router