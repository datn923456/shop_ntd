const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const mongooseTimestamp = require('mongoose-timestamp');

const codeOrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến user
    nameCombo:{
        type: String,
        ref:'ComboCode',
    },
        nameCode: {
            type: String,
            ref: 'Code1' , // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        code: {
            type: String,
            ref: 'Code1' , // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        nameCode1: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        code1: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        nameCode2: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        code2: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        nameCode3: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        code3: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        nameCode4: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        code4: {
            type: String,
            ref: 'ComboCode', // Thay 'Code1' bằng tên thực tế của model sản phẩm
        },
        // quantity: {
        //     type: Number,
        // }
    
    totalPrice: { type: Number},
    myCreatedAt: { type: Date, default: Date.now }
});

// const CodeOrder = mongoose.model('CodeOrder', codeOrderSchema);
//codeOrderSchema.plugin(mongooseTimestamp, { createdAt: 'myCreatedAt' });

codeOrderSchema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Codeorder', codeOrderSchema);