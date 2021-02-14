const { execute } = require("./removeSignUpId");

module.exports = {
    name: 'directmessage',
    async execute(user) {
        user.send("Your reaction to the DTF did not work! Please try again with a unique emoji.");
    }
}