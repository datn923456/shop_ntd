const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const moment = require('moment');

const accReRollHTNGchema = new Schema({
    imageHTNG:{type: String},
    nameHTNG:{type: String},
    priceHTNG: { type: Number },
    infoHTNG:{type: String},
    register: { type: String },
    account: {type:String},
    server:{type: String},
    myReRollHTNGCreatedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Trước khi lưu vào CSDL, chuyển đổi createdAt và updatedAt sang chuỗi "DD/MM/YYYY HH:mm"


// Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
accReRollHTNGchema.plugin(mongoosedelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('accrerollhtng', accReRollHTNGchema);