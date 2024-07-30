const mongoose = require('mongoose');
const University = require('../models/University'); 
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI, { });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); 
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const universities = [
    { name: "Đại học Quốc gia Hà Nội" },
    { name: "Đại học Bách Khoa Hà Nội" },
    { name: "Đại học Kinh tế TP.HCM" },
    { name: "Đại học Sài Gòn" },
    { name: "Đại học Huế" },
    { name: "Đại học Nha Trang" },
    { name: "Đại học Đà Nẵng" },
    { name: "Đại học Cần Thơ" },
    { name: "Đại học Thái Nguyên" },
    { name: "Đại học Hạ Long" }
];

const seedUniversities = async () => {
    try {
        // Xóa tất cả các trường đại học hiện tại (nếu cần)
        await University.deleteMany({});
        const result = await University.insertMany(universities);
        console.log('Universities seeded:', result);
    } catch (error) {
        console.error('Error seeding universities:', error);
    } finally {
        // Đóng kết nối
        mongoose.connection.close();
    }
};

seedUniversities();