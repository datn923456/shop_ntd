const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');

const accRerollOrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến user
    typeAcc:{type: String},
    nameAcc:{type: String},
    username:{type: String},
    password:{type: String},
    priceAcc: { type: Number},
    infoAcc:{type: String},
    registerAcc:{type: String},
    accountAcc:{type: String},
    serverAcc:{type: String},
    accRerollCreatedAt: { type: Date, default: Date.now },
});

// const CodeOrder = mongoose.model('CodeOrder', codeOrderSchema);
//codeOrderSchema.plugin(mongooseTimestamp, { createdAt: 'myCreatedAt' });

accRerollOrderSchema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Accrerollorder', accRerollOrderSchema);