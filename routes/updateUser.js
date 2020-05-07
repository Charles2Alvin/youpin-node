const User = require('../model/user');

const UpdateUserRouter = (req, res) => {
    const email = req.body.email;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const wechat = req.body.wechat;
    const username = req.body.username;
    const phone = req.body.phone;
    const filter = {email};
    const update = {birthday, gender, wechat, username, phone};
    User.findOneAndUpdate(filter, update).exec(function (err, user) {
        if (err) console.error(err);
        res.status(200).send({msg: "success"});
    })
};

module.exports = UpdateUserRouter;