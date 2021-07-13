module.exports = {
    name: 'dtfreminder',
    async execute(client, chan, isTesting) {
        var users = [];
        var reminderMessage = "1 hour warning! Please remove your emote if you can't make it or can't play 3 maps, so we can get an accurate head count! ";
        const dbConnection = await client.command.get('dbconnection').execute(isTesting);
        var checkSignupQ = 'SELECT * FROM `event_signup_ids` WHERE 1';

        dbConnection.query(checkSignupQ, (err, results, fields) => {
            if (err){
                console.log(err);
            }
            for (let i = 0; i < results.length; i++){
                users.push("<@" + results[i].discord_id + ">");
            }
            chan.send(users.toString() + " " + reminderMessage)
            dbConnection.end();
        })
    }
}