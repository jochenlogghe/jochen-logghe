var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClanSchema = new Schema({
    name:           { type:String, default: '' },
    description:    { type:String, default: '' },
    picture:        { type:String, default: '' },
    createdOn:      { type:Date, default: Date.now },
    modifiedOn:     { type:Date, default: Date.now }
});

module.exports = mongoose.model('Clan', ClanSchema);