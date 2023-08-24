var mongoose = require('mongoose');

//schema: khai báo, định nghĩa cấu trúc của bảng (tên các cột & kiểu dữ liệu tương ứng)
var ChildrentoySchema = mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    date: Date,
    image: String
});


const ChildrentoyModel = mongoose.model('tre con', ChildrentoySchema, 'childrentoy');
module.exports = ChildrentoyModel;