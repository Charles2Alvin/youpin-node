const User = require('../model/user');
const Token = require('../model/token');
const uuid = require('uuid');

const RegisterRouter = (req, res) => {
    const loginName = req.body.loginName;
    const password = req.body.password;
    const type = req.body.type;
    if (loginName === "" || password === "") {
        console.log("Received null parameter");
        res.status(400).send({msg: "Received null parameter"});
        return;
    }
    // 先验证该邮箱是否注册
    User.find({"$or":
            [
                {email: loginName},
                {username: loginName},
                {phone: loginName}
                ]}).exec(function (err, users) {
        let msg;
        const registered = users.length !== 0;
        if (!registered) {
            User.countDocuments().exec(function (err, count) {
                const userID = count + 1;
                let user;
                if (type === 'email') user = User({
                    _id: userID,
                    email: loginName,
                    password: password,
                });
                else if (type === 'phone') user = User({
                    _id: userID,
                    phone: loginName,
                    password: password,
                });
                user.save(function (err, user) {
                    if (err) return console.error(err);
                    msg = "Success";
                    const token = uuid.v4();
                    const reply = {msg, userID, token};
                    const filter = {userID};
                    const update = {token, username: user.username};
                    Token.findOneAndUpdate(filter, update, {new: true, upsert: true}).exec(
                        function (err, t) {
                            if (err) return console.error(err);
                            res.status(200).send(reply);
                            console.log("Register router: id", userID, "saved", "token", token);
                        }
                    )

                })
            });
        } else {
            msg = "This account has been registered";
            console.log("Register router: ", loginName, msg);
            res.status(400).send({msg});
        }
    });

};

module.exports = RegisterRouter;