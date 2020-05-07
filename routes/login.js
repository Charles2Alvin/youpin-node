const uuid = require('uuid');
const User = require('../model/user');
const Token = require('../model/token');

const LoginRouter = (req, res) => {
    const loginName = req.body.loginName;
    const password = req.body.password;
    User.find({"$or": [
                {email: loginName},
                {username: loginName},
                {phone: loginName}
            ]}).exec(function (err, users) {
                let msg;
        if (users.length === 0) {
            msg = "Account does not exist";
            console.log("Login router:", msg);
            res.status(400).send({msg});
        }
        else if (users[0].password === password) {
            msg = "Success";
            const userID = users[0]._id;
            const token = uuid.v4();
            const reply = {msg, userID, token};
            const filter = {userID};
            const update = {token, username: users[0].username};
            Token.findOneAndUpdate(filter, update, {new: true, upsert: true}).exec(
                function (err, t) {
                    if (err) return console.error(err);
                    res.status(200).send(reply);
                }
            )
        } else {
            msg = "Incorrect password";
            res.status(400).send({msg});
        }
        console.log("Login router:", msg);
    });
};

module.exports = LoginRouter;
