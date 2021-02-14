module.exports = {
    name: 'uniqueemojidirectmessage',
    async execute(user) {
        user.send("Your reaction to the DTF did not work! You have already signed up.");
    }
}