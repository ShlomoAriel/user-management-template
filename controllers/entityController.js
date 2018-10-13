const { Router } = require('express');
const router = Router();
const passport = require('passport');

module.exports = configureRoleRoutes;

function configureRoleRoutes() {
  router.get(
    '/api/getRoles',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
      RoleModel.find()
        .populate('type')
        .exec(function(err, roles) {
          if (err) {
            res.send('find no good' + err);
          } else {
            res.json(roles);
          }
        });
    }
  );
}

router.post('/api/addEntity', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.query.entityName, next) 
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

router.get('/api/getEntities', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.query.entityName, next)
    entity.find(function (err, entities) {
        if (err) {
            next('getEntities no good' + err);
        }
        else {
            res.json(entities);
        }
    })
});

router.put('/api/updateEntity/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('updating entity: ' + req.body.entityData.name)
    var entity = getEntityModel(req.body.entityName, next)
    entity.findOneAndUpdate(
        { _id: req.params.id },
        req.body.entityData,
        { upsert: true },
        function (err, newEntity) {
            if (err) {
                next('Error updating Entity\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

router.delete('/api/deleteEntity/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var entity = getEntityModel(req.body.entityName, next)
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

function getEntityModel(name, next){
    var entityName = name
    if(!entityName){
        next('Entity Name no good');
    }
    try {
        var entity = require('./models/' + entityName)
    }
    catch (err) {
        next('Entity path ./models/' + entityName + ' not found\n' + err)
    }
    return entity
}