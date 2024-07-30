const mongoose = require("mongoose");
const University= require('../models/University');


exports.create_university = async (req, res, next) => {
    const { name } = req.body;

    try {
        // Kiểm tra nếu trường đại học đã tồn tại
        const existingUniversity = await University.findOne({ name });

        if (existingUniversity) {
            return res.status(400).json({
                message: 'University with this name already exists'
            });
        }

        // Tạo đối tượng University mới
        const newUniversity = new University({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        // Lưu đối tượng vào cơ sở dữ liệu
        const savedUniversity = await newUniversity.save();

        // Phản hồi thành công
        res.status(201).json({
            message: 'University created successfully',
            data: savedUniversity
        });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error creating university:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.get_all=(req,res,next) => {
    var perPage = 6
    var page = req.query.page || 1
    var query= {pending:false}
    if(req.query.university!=null)
       query['university']=req.query.university
    var count;
    console.log(query)
    query={}
    University.countDocuments(query)
    .then(result=> { 
      count=result
      University.find(query)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(docs => {
          const response = {
              docs:docs,
              count:count,
              pages: Math.ceil(count / perPage),
          }
          res.status(200).json(response);
      })
    })
        .catch(err => {
          console.log(err+"wjat");
          res.status(500).json({
            error: err
          });
        })
  }