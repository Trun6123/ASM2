var mongoose = require('mongoose');

//schema: khai báo, định nghĩa cấu trúc của bảng (tên các cột & kiểu dữ liệu tương ứng)
var AdulttoySchema = mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    date: Date,
    image: String
});

const AdulttoyModel = mongoose.model('nguoi lon', AdulttoySchema, 'adulttoy');
module.exports = AdulttoyModel;