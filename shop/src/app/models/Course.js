const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true,},
    description: { type: String},
    image: {type: String},
    videoId:{type: String, required: true,},
    level: {type: String},
    slug: {type: String, slug: 'name', unique: true},

});

//add plugins
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
mongoose.plugin(mongooseTimestamp);
Course.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Course',Course);