const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
//const mongooseTimestamp = require('mongoose-timestamp');

const ComboCodeSchema = new Schema({
    nameCombo:{ type: String},
    nameCode1: { type: String},
    code1: { type: String},
    nameCode2: { type: String},
    code2: { type: String},
    nameCode3: { type: String},
    code3: { type: String},
    nameCode4: { type: String},
    code4: { type: String},
    price:{type: Number},
    //createdAt: { type: Date, default: Date.now }, // Thêm trường createdAt
    updatedAt: { type: Date, default: Date.now }, // Thêm trường updatedAt
    slug: {type: String, slug: 'nameCombo'},
    image1:{type: String,},
    image2:{type: String,},
    image3:{type: String,},
    image4:{type: String,},
    letterNumber:{type: String}
    // Thêm các trường khác của người dùng tại đây nếu cần
});

//Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
// if (!userSchema.virtuals.createdAt) {
//     userSchema.virtual('createdAt').get(function() {
//         return this._createdAt;
//     });
// }
ComboCodeSchema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Combocode', ComboCodeSchema);