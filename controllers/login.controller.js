var Register = require('../models/userDetail.model');
var itemModel = require('../models/itemDetails');
// var feed = require('../models/feeds.models')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
    // console.log('login details   ' + JSON.stringify(req.body))
    Register.findOne({ email: req.body.email }, function (err, info) {
        // console.log('info data ' + info)
        if (err) {
            next(err);
        } else {
            if (bcrypt.compareSync(req.body.password, info.password)) {
                const token = jwt.sign({ id: info._id }, 'secretKey', { expiresIn: '1h' });
                res.json({ status: "success", data: { user: info, token: token } });
            } else {
                res.json({ status: "error" });
            }
        }

    })
}

exports.signup_create = function (req, res, next) {
    var reg_info = new Register(req.body);

    reg_info.save(req.body, function (err, result) {
        if (err) {
            next(err);
        } else {
            console.log('signup_create ' + result);
            res.json(result);
        }
    });
}

exports.create_item = function (req, res, next) {
    var tada = new itemModel(req.body);
    tada.save(req.body, function (err, result) {
        if (err) {
            console.log('item')
            next(err);
        } else {
            console.log('item', result)
            res.json(result);
        }
    })
}

var totalCount = function (req, res) {
    itemModel.find({}, function (err, result) {
        if (err)
            res.send(err);
        res.json({count: result.length});
    })
}

exports.getItems = function (req, res) {
    var page = 1;
    var limit = 10;
    itemModel.find()
        .skip((page - 1) * 10)
        .limit(10)
        .exec(function (err, doc) {
            if (err) { res.status(500).json(err); return; };
            res.status(200).json(
                {
                    total: totalCount.count,
                    page: page,
                    pageSize: limit,
                    data: doc,
                }
            );
        });
    // itemModel.find({},function(err, result){
    //     if(err)
    //         res.send(err);
    //     res.json(result);    
    // })
}



exports.editItemById = function (req, res, next) {
    console.log(req.params)
    itemModel.findByIdAndUpdate(req.params.id, req.body, function (err, updateuser) {
        if (err) {
            next(err);
        } else {
            res.json(updateuser);
        }
    })
}