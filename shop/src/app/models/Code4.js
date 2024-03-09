const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
//const mongooseTimestamp = require('mongoose-timestamp');

const Code4Schema = new Schema({
    nameCode: { type: String},
    code: { type: String},
    price:{type: Number},
    quatity:{type: Number},
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
// if (!userSchema.virtuals.createdAt) {
//     userSchema.virtual('createdAt').get(function() {
//         return this._createdAt;
//     });
// }
Code4Schema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Code4', Code4Schema);