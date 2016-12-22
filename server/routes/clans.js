var express = require('express');
var router  = express.Router();

var Clan    = require('../models/clan');

/* GET all */
router.get('/', function(request, response){
    Clan.find(function(error, clans){
        if(error) response.send(error);
        response.json(clans);
    });
});

/* GET by id */
router.get('/:clan_id', function(request, response){
    Clan.findById(request.params.clan_id, function(error, clan){
        if(error) response.send(error);
        response.json(clan);
    });
});

/* POST */
router.post('/', function(request, response){
    var clan = new Clan();

    clan.name = request.body.name;
    clan.description = request.body.description;
    clan.picture = request.body.picture;
    clan.createdOn = Date.now();

    clan.save(function(error){
        if(error) response.send(error);
        response.json({ message: 'clan successfully created' });
    });
});

/* PUT */
router.put('/:clan_id', function(request, response){
    Clan.findById(request.params.clan_id, function(error, clan){
        clan.name = request.body.name;
        clan.description = request.body.description;
        clan.picture = request.body.picture;
        clan.modifiedOn = Date.now();

        clan.save(function(error){
            if(error) response.send(error);
            response.json({ message: 'clan successfully updated' });
        });
    });
});

/* DELETE */
router.delete('/:clan_id', function(request, response){
    Clan.remove(
        { _id: request.params.clan_id }, 
        function(error, clan){
            if(error) response.send(error);
            response.json({ message: 'clan successfully deleted' });
        });
});

module.exports = router;