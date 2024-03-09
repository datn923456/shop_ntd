const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const moment = require('moment');

const historyGiaoDichSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    //request_id: { type: Number },
    nameGiaoDich: { type: String, required: true },
    username: { type: String, required: true },
    //telco: { type: String },
    //code: { type: String },
    //serial: { type: String },
    //amount: { type: Number },
    value: { type: Number },
    //declared_value: { type: Number },
    //message: { type: String },
    coin: { type: Number },
    //callback_sign: { type: String },
    //command: { type: String },
    HistoryGiaoDichCreatedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Trước khi lưu vào CSDL, chuyển đổi createdAt và updatedAt sang chuỗi "DD/MM/YYYY HH:mm"


// Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
historyGiaoDichSchema.plugin(mongoosedelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('historyGiaoDich', historyGiaoDichSchema);