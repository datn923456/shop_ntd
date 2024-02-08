module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        //map qua toObject từ phần tử bên trong
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};