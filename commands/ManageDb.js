module.exports = {
    name: 'managedb',
    async execute(action, table, user, client, isTesting, epoch){

        const dbConnection = await client.command.get('dbconnection').execute(isTesting);

        if (action == 'insert' && table == 'event_signup_ids'){

            var insertQEvent = 'INSERT INTO `event_signup_ids` (discord_id, username) VALUES (?, ?)';
            var data = [user.id, user.username];

            dbConnection.query(insertQEvent, data);
            dbConnection.end();

        }else if (action == 'delete' && table == 'event_signup_ids'){

            var deleteQEvent = 'DELETE FROM `event_signup_ids` WHERE discord_id = ? LIMIT 1';
            var data = [user.id];

            dbConnection.query(deleteQEvent, data);
            dbConnection.end();

        }else if (action == 'deleteall' && table == 'event_signup_ids'){

            var deleteAllQEvent = 'DELETE FROM `event_signup_ids` WHERE 1';

            dbConnection.query(deleteAllQEvent);
            dbConnection.end();

        }else if (action == 'insert' && table == 'match_times'){
            var insertQEvent = 'INSERT INTO `match_times` (epoch) VALUES (?)';
            var data = [epoch];

            dbConnection.query(insertQEvent, data);
            dbConnection.end();

        }else if (action == 'delete' && table == 'match_times'){

            var deleteQEvent = 'DELETE FROM `match_times` WHERE epoch = ? LIMIT 1';
            var data = [epoch];

            dbConnection.query(deleteQEvent, data);
            dbConnection.end();

        }else if (action == 'delete' && table == 'current_match_job'){

            var deleteQEvent = 'DELETE FROM `current_match_job` WHERE 1';

            dbConnection.query(deleteQEvent, data);
            dbConnection.end();

        }else if (action == 'insert' && table == 'current_match_job'){

            var insertQEvent = 'INSERT INTO `current_match_job` (discord_id) VALUES (?)';
            var data = [user];

            dbConnection.query(insertQEvent, data);
            dbConnection.end();

        }
    }
}