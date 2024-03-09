const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
//const mongooseTimestamp = require('mongoose-timestamp');

const InfoCodeSchema = new Schema({
    nameCode: { type: String},
    price:{type: Number},
    detail:{type:String},
    //createdAt: { type: Date, default: Date.now }, // Thêm trường createdAt
    updatedAt: { type: Date, default: Date.now }, // Thêm trường updatedAt
    slug: {type: String, slug: 'nameCode'},
    image:{type: String,},
    letterNumber:{type: String}
    // Thêm các trường khác của người dùng tại đây nếu cần
});

//Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
InfoCodeSchema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Infocode', InfoCodeSchema);