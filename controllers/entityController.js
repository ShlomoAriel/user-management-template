const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.post('/api/addEntity', passport.authenticate('jwt', { session: false }), addEntity);

router.get('/api/get/:entityName/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.params.entityName, next)   
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

router.get('/api/get/:entityName', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    var entityName = req.params.entityName
    if(entityName){
        var entities = await getEntitiesBy(entityName, next)
        if(entities){
            res.json({"result":entities});            
        }
    }
});

router.put('/api/upsert/:entityName/:id?', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    if (!req.params.entityName) {
        next('Error updating Entity\n' + err);
    }
    var entity = getEntityModel(req.params.entityName, next)
    if (req.params.id == null || req.params.id == undefined){
        addEntity(req, res, next)
    } else {
        const filter = { _id: req.params.id };
        const update = req.body.entity;
        entity.findOneAndUpdate( filter, update, { 
            new: true,
            upsert: true , returnOriginal: false
        },
            function (err, newEntity) {
                if (err) {
                    next('Error updating Entity\n' + err);
                }
                else {
                    res.json(newEntity);
                }
            });
    }
});

router.delete('/api/delete/:entityName/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
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
                if(newEntity == null) {
                    res.status(404).json({status:404})
                } else {
                    res.json(newEntity)
                    res.status(200)
                }
                
            }
        });
});

router.post('/api/find/:entityName', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.params.entityName, next)
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
        // prints "The author is Ian Fleming"
    });

    // entity.find(filter, function (err, entities) {
    //     if (err) {
    //         next('find no good' + err);
    //     }
    //     else {
            
    //         res.json(entities);
    //     }
    // }).populate('Season')
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

async function getEntitiesById(name, id, next){
    var entity = getEntityModel(name, next)
    return entity.findOne({ _id: id }, (err, entity) => {
        if (err) {
            next('getEntity: ' + name + ' ' + id + ' no good' + err)
        }
        else {
            return entity
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

function addEntity(req, res, next) {
    var entityModel = getEntityModel(req.params.entityName, next)
    var entity = new entityModel(req.body.entity)
    entity.save((err, newEntity) => {
        if (err) {
            return next(err);
        }
        res.status(200).send('OK');
    });
}

router.put('/api/addToEntity', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    var mainEntity = await getEntitiesById(req.body.secondaryEntity.name, req.body.secondaryEntity.id)
    console.log(entity[req.body.collectionName])
    mainEntity[req.body.collectionName].push(req.body.mainEntity)
    mainEntity.save(function(err, doc){
        if(err) {
            res.status(400).send(err.stack)
        }
        res.status(200).send(doc)
    })
})

module.exports = router