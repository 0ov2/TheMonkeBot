module.exports = {
    name: 'dtfchecksignedup',
    async execute(chan, client, isTesting) {
        var users = [];

        var checkSignupQ = 'SELECT * FROM `event_signup_ids` WHERE 1';
        const dbConnection = await client.command.get('dbconnection').execute(isTesting);
        dbConnection.query(checkSignupQ, (err, results, fields) => {
            if (err){
                return console.log(err);
            } else if (results.length == 0){
                dbConnection.end();
                return chan.send('no users found');
            }

            for (let i = 0; i < results.length; i++) {
                users.push(results[i].username + ' ' + results[i].discord_id);
            }

            chan.send(users.toString() + ` Total: ${results.length.toString()}`)
            dbConnection.end();
        });
    }
}