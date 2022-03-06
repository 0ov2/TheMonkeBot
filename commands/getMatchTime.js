const spacetime = require('spacetime');
const schedule = require('node-schedule');

async function GetMatchTime(client, chan, isTesting) {
    var epochList = [];
    var epochNum, epochMin;

    var checkScrimEpoch = 'SELECT * FROM `match_times` WHERE 1';

    const dbConnection1 = await client.command.get('dbconnection').execute(isTesting);

    dbConnection1.query(checkScrimEpoch, async (err, results, fields) => {
        if (err){
            dbConnection1.end();
            return console.log(err);
        } else if (results.length == 0){
            dbConnection1.end();
            return;
        } else {
            for (let i = 0; i < results.length; i++) {
                epochList.push(results[i].epoch);
            }
    
            epochNum = epochList.map(Number);
            epochMin = Math.min(...epochNum);
            console.log(Math.min(...epochNum));
    
            dbConnection1.end();
        }

        if (epochMin){

            var s = spacetime(epochMin*1000);
            var t = s.subtract(2, 'hour');
            var d = s.add(1, 'minute');

            var date = new Date(s.format('{year}'), s.format('{month-pad}'), s.format('{date-pad}'), t.unixFmt('HH'), t.unixFmt('mm'));
            var updateJob = new Date(s.format('{year}'), s.format('{month-pad}'), s.format('{date-pad}'), t.unixFmt('HH'), d.unixFmt('mm'));

            schedule.scheduleJob(date, async () => {  
                console.log('monke do match/scrim reminder');
                try {
    
                const dbConnection3 = await client.command.get('dbconnection').execute(isTesting);
    
                await dbConnection3.query(checkScrimEpoch, async (err, results, fields) => {
                    if (err){
                        dbConnection3.end();
                        return console.log(err);
                    } else if (results.length == 0){
                        dbConnection3.end();
                        return;
                    } else {
                        for (let i = 0; i < results.length; i++) {
                            epochList.push(results[i].epoch);
                        }
                        epochNum = epochList.map(Number);
                        epochMin = Math.min(...epochNum);
        
                        dbConnection3.end();

                        GetSignUps(client, epochMin, isTesting);
                        
                        await client.command.get('managedb').execute('delete', 'match_times', '', client, isTesting, epochMin);
                    }
                });
    
                } catch (error) {
                    console.log(error);
                }

                console.log('monke done. *monke noises*');
            });

            schedule.scheduleJob(updateJob, async () => {
                try {
                    const dbConnection = await client.command.get('dbconnection').execute(isTesting);
                    var checkSignupQ = 'SELECT * FROM `current_match_job` WHERE 1';
                    var users = [];
                    var reminderMessage = "Scrim/Match in 2 hours, get a warm up in. OUGH OUGH";

                    dbConnection.query(checkSignupQ, (err, results, fields) => {
                        if (err){
                            console.log(err);
                        }
                        for (let i = 0; i < results.length; i++){
                            users.push("<@" + results[i].discord_id + ">");
                        }
                        chan.send(users.toString() + " " + reminderMessage);
                        dbConnection.end();
                        client.command.get("managedb").execute("delete", "current_match_job", "", client, isTesting, "");
                    })

                    const dbConnection4 = await client.command.get('dbconnection').execute(isTesting);

                    dbConnection4.query(checkScrimEpoch, (err, results, fields) => {
                        if (err){
                            dbConnection4.end();
                            return console.log(err);
                        } else if (results.length == 0){
                            dbConnection4.end();
                            return;
                        } else {
                            dbConnection4.end();
                            GetMatchTime(client, chan, isTesting);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        }else {
            return;
        }
    });
}

async function GetSignUps(client, epochMin, isTesting){
    var matchMessages = await client.channels.cache.find(chan => chan.name == 'op-match-announcements');
    var messages = await matchMessages.messages.fetch();
    var matchMsg = messages.find(msg => msg.content.includes(epochMin.toString()) && msg.author.bot == false); 

    try {
        matchMsg.reactions.cache.forEach(async emoji => {
            await matchMsg.reactions.resolve(emoji).users.fetch().then(async userList => {
                userList.forEach(async user => {
                    if (user) {
                        await client.command.get("managedb").execute("insert", "current_match_job", user.id, client, isTesting, "");
                    }
                })
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = GetMatchTime;