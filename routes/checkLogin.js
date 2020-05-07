const Token = require('../model/token');

const CheckLoginRouter = (req, res) => {
    const userID = req.body.userID;
    const token = req.body.token;
    Token.find({userID}).exec(function (err, tokens) {
        if (err) return console.error(err);
        let msg;
        if (tokens.length === 0) {
            msg = "This account has not logined";
            res.status(400).send({msg});
        } else if (tokens.length === 1 && tokens[0].token === token) {
            msg = "Correct login token";
            res.status(200).send({msg, username: tokens[0].username});
        } else if (tokens.length === 1 && tokens[0].token !== token) {
            msg = "Wrong token";
            res.status(400).send({msg});
        } else {
            msg = "Errors happen on the server";
            res.status(500).send({msg});
        }
        console.log(msg);
    });
};

module.exports = CheckLoginRouter;