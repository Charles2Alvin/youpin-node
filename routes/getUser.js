const User = require('../model/user');

const UpdateUserRouter = (req, res) => {
    const userID = req.query.userID;
    User.find({_id: userID}).exec(function (err, user) {
        if (err) return console.error(err);
        console.log(user);
        res.status(200).send(user[0]);
    })
};

module.exports = UpdateUserRouter;