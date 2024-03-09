const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name:{type: String,},
    coin:{type:Number},
    createdAt: { type: Date, default: Date.now }, // Thêm trường createdAt
    updatedAt: { type: Date, default: Date.now }, // Thêm trường updatedAt
    role:{type: String},
    slug: {type: String, slug: 'username', unique: true},
    image:{type: String,}
    // Thêm các trường khác của người dùng tại đây nếu cần
});

//Add plugin
mongoose.plugin(slug);
mongoose.set('strictQuery', true);
UserSchema.plugin(mongoosedelete, {deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('User', UserSchema);

// khoan, sửa theo kia á