const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const moment = require('moment');

const doanhThuSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: String },
    nameGiaoDich: { type: String, required: true },
    username: { type: String, required: true },
    quantity: {type: Number},
    price: { type: Number },
    type: { type: String },
    doanhThuCreatedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});




// Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
doanhThuSchema.plugin(mongoosedelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('doanhThu', doanhThuSchema);