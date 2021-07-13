const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});

const prefix = '-';

const fs = require('fs');

const spacetime = require('spacetime');

var getChannelId = require("./commands/getChannelId");

var GetMessageId = require("./commands/getMessageId");

var getRole = require("./commands/getRole");

var checkEmoji = require("./commands/checkEmoji");

var schedule = require('node-schedule');

var isTesting = true;

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

client.once('ready', async () => { // automatic commands
    const monkeChan = getChannelId(client, 'monke-bot');
    const logChan = getChannelId(client, 'dt-logs');
    monkeChan.send('Monke online'); // ready message
    console.log('monke');

    await client.command.get('managesignups').execute(client, 'update', isTesting); // update DTF signups

    // Availability
    // EU
    schedule.scheduleJob('0 18 * * 0', () => {  //* * * * * , 0 18 * * 0
        console.log('monke do availability');
        try {

        client.command.get('autoAvailability').execute(client, getChannelId(client, 'op-availability'), getRole(client, 'op'));
        client.command.get('opMatchAnnouncement').execute(client, getChannelId(client, 'op-match-announcements'), getRole(client, 'op'));

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // NA
    schedule.scheduleJob('0 0 * * 4', () => { //* * * * *  0 0 * * 4
        console.log('monke do availability');
        try {

            client.command.get('dtMatchAnnouncement').execute(client, getChannelId(client, 'dt-availability'), getRole(client, 'dream'));
            // new log
            var logDate = spacetime(spacetime.now).goto('America/New_York');
            logChan.send(`**New match announcement ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}**\n`);

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    schedule.scheduleJob('0 23 * * 0', () => { //0 23 * * 0
        console.log('monke do availability');
        try {
            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/biAvailabilityMessageIds.txt', "", options);
            
            client.command.get('dtAutoAvailability').execute(client, getChannelId(client, 'dt-availability'), getRole(client, 'dream')); 
            client.command.get('octaneAutoAvailability').execute(client, getChannelId(client, 'octane-availability'), getRole(client, 'octane'));
            // add new log
            var logDate = spacetime(spacetime.now).goto('America/New_York');
            logChan.send(`**A new week ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}**\n`);
    
        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // auto Mixed friendly
    schedule.scheduleJob('59 18 * * 6', () => { //
        monkeChan.send("-dtf");
    })
    schedule.scheduleJob('0 1 * * 0', () => { //
        monkeChan.send("-dtfdel");
    })
    schedule.scheduleJob('30 18 * * 0', () => { //
        monkeChan.send("-role");
    })
    schedule.scheduleJob('0 19 * * 6', () => { //
        monkeChan.send("-rem");
    })
})

client.on('message', async (message) => { // manual commands

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const roleid = getRole(client, 'superpowers');
    const monkeRole = getRole(client, 'Monke');
    const opRole = getRole(client, 'op');
    const dreamRole = getRole(client, 'dream');
    const octaneRole = getRole(client, 'octane');
    const logChan = getChannelId(client, 'dt-logs');

    if (command === 'slow') { // activates slowmode for channel
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            client.command.get('slowmode').execute(message, args); 
        }
    } else if (command === 'av') { // posts availability message for channel
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            var stream = fs.createWriteStream("./messageIDs/biAvailabilityMessageIds.txt", {flags:'w'});

            var opAvailabilityId = getChannelId(client, 'op-availability');
            var dtAvailabilityId = getChannelId(client, 'dt-availability');
            var octaneAvailabilityId = getChannelId(client, 'octane-availability');

            if (message.channel.id === opAvailabilityId.id) {
                client.command.get('autoAvailability').execute(client, opAvailabilityId, opRole.id);
            }else if (message.channel.id === dtAvailabilityId.id) {
                client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId, dreamRole.id);
                // new log
                var logDate = spacetime(spacetime.now).goto('America/New_York');
                logChan.send(`**A new week ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}**\n`);

            }else if (message.channel.id === octaneAvailabilityId.id) {
                stream.write("");
                client.command.get('octaneAutoAvailability').execute(client, octaneAvailabilityId, octaneRole.id);
            }else {
                return;
            }
            
            message.delete();
        }
    } else if (command === 'avmatch'){ // post match availability message for channel
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            var dtAvailabilityId = getChannelId(client, 'dt-availability');
            var opMatchAnnouncement = getChannelId(client, 'op-match-announcements');
            if (message.channel.id === dtAvailabilityId.id){
                client.command.get('dtMatchAnnouncement').execute(client, dtAvailabilityId, dreamRole.id);
                //new log
                var logDate = spacetime(spacetime.now).goto('America/New_York');
                logChan.send(`**New match announcement ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}**\n`);

            } else if (message.channel.id === opMatchAnnouncement.id){
                client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement, opRole.id);
            }
        }
    }else if (command === 'dtf') { // creates dtf voice channels
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)){
            client.command.get('createmxfchannels').execute(message);
            await client.command.get('managesignups').execute(client, 'update');
        }
    } else if (command === 'dtfdel') { // deletes dtf voice channels
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)){
           
            client.command.get('deletemxfchannels').execute(message);

        }
    } else if (command === 'lfg') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            
            //client.command.get('lfgmessage').execute(client, Discord, getChannelId(client, 'lfg-role-claim'));

        }
    } else if (command === 'role') { // posts dtf message
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            await client.command.get('managedb').execute('deleteall', 'event_signup_ids', '', client, isTesting);
            client.command.get('mixedFriendlyAnnouncement').execute(client, Discord, message);
            client.command.get('dtfmessage').execute(client, message);

        }
    } else if (command === 'rem') { // tags everyone signed up ti dtf

        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
                    
            var chan = getChannelId(client, 'dream-teams-friendly');
            client.command.get('dtfreminder').execute(client, chan, isTesting);

        }
    } else if (command === 'remcheck') { // outputs the list of dtf signups
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            
            var chan = getChannelId(client, 'monke-bot');
            await client.command.get('dtfchecksignedup').execute(chan, client, isTesting);

        }
    } else if (command === 'remupdate') { // updates signup list of current signed up individuels 
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            
            await client.command.get('managesignups').execute(args, message, client, 'update');
            message.react('✅');
        }
    } else if (command === 'moveoct'){ // moves all users in the octane voice channel to fam-2 voice channel
        if (message.channel === getChannelId(client, 'superpowers-only')){
             // Blues id                                      Kyles id                                      0.os id
            if (message.author.id == '660553420066783232'  || message.author.id == '392933270779854848' || message.author.id == '259466508814516224'){

                await client.command.get('movemembers').execute(message);
                
            }
        }
    } else if (command === 'm' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){

        await client.command.get('newmatch').execute(args, getChannelId(client, 'op-match-announcements'), opRole.id, client, '', '', message); // creates new match announcement
    
    } else if (command === 'mdel' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){
        
        var chan = await getChannelId(client, 'op-match-announcements');
        var messages = await chan.messages.fetch();
        var selectedMessage = await messages.find(msg => msg.id == args);
        await selectedMessage.delete();

    } else if (command === 'medit' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){

        var chan = await getChannelId(client, 'op-match-announcements');
        var messages = await chan.messages.fetch();
        var selectedMessage = await messages.find(msg => msg.id == args[0]);
        args.splice(0, 1);
        await client.command.get('newmatch').execute(args, getChannelId(client, 'op-match-announcements'), opRole.id, client, 'edit', selectedMessage, message);

    }
})

client.on("messageReactionAdd", async (reaction, user) => { // NEED TO RE CODE
    if (user.bot) return;

    var dtfChanId = getChannelId(client, 'dream-teams-friendly'); 
    var opChanId = getChannelId(client, 'op-availability');
    var dtChanId = getChannelId(client, 'dt-availability');
    var octaneChanId = getChannelId(client, 'octane-availability');
    var opMatchChanId = getChannelId(client, 'op-match-announcements');
    var lfgChan = getChannelId(client, 'lfg-role-claim');
    var logChan = getChannelId(client, 'dt-logs');

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == await GetMessageId(client, 'roleclaim')){

        var dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id); // gives reacted user DTF role 
        }
        
    } else if (reaction.message.channel.id === lfgChan.id && reaction.message.id == await GetMessageId(client, 'lfg')) {
        const pavlovRole = getRole(client, 'pavlov-lfg');
        const pop1Role = getRole(client, 'pop1-lfg');
        if (reaction.emoji.name === '🍆'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(pavlovRole.id); // gives reacted user pavlov role 
        } else if (reaction.emoji.name === '💦') {
            await reaction.message.guild.members.cache.get(user.id).roles.add(pop1Role.id); // gives reacted user population 1 role 
        }
    } else if (reaction.message.channel.id === opChanId.id) {

        await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability 

    } else if (reaction.message.channel.id === octaneChanId.id) {

        await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability

    } else if (reaction.message.channel.id === opMatchChanId.id && reaction.message.id == await GetMessageId(client, 'opmatch')) {

        await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability

    } else if (reaction.message.channel.id === dtChanId.id) { // DT
        
        var logDate = spacetime(spacetime.now).goto('America/New_York'); 
        var dtMatchId = await GetMessageId(client, 'dtmatch');
        var dtAvId = await GetMessageId(client, 'dtav');

        if (reaction.message.id == dtMatchId) {
            await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability
            // new log
            logChan.send(`**MATCH** ${user.username} Added their reaction to MATCH announcement - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`); // adds log if someone reacts
        } else if (reaction.message.id == dtAvId) {
            await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability
            // new log
            logChan.send(`**AV** ${user.username} Added their reaction to ${await checkEmoji(reaction)} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`); // adds log if someone reacts
        } else if (reaction.message.id !== dtMatchId && reaction.message.id !== dtAvId) {
            // new log
            logChan.send(`**CUSTOM** ${user.username} Added their reaction ${reaction.emoji.name} to ${reaction.message.content.toString()} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`); // adds log if someone reacts
        }

    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == await GetMessageId(client, 'eudtf') || reaction.message.channel.id === dtfChanId.id && reaction.message.id == await GetMessageId(client, 'nadtf')) {
        const dbconnection = await client.command.get('dbconnection').execute(isTesting);
        const checkQ = 'SELECT * FROM `event_signup_ids` WHERE discord_id = ' + user.id;
        
        dbconnection.query(checkQ, async (err, results, fields) => {

            if (err) {
                return console.log(err.message);
            } else if (reaction.count > 1){
                if (!reaction._emoji.id) {
                    await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                    reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                } else {
                    await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                    reaction.message.reactions.resolve(reaction._emoji.id).users.remove(user.id);
                }
                 // stacking emoji
                await client.command.get('directmessage').execute(user);
            } else if (results.length > 0){
                 // trying to sign up while signed up
                 if (!reaction._emoji.id) {
                    await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                    reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                } else {
                    await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                    reaction.message.reactions.resolve(reaction._emoji.id).users.remove(user.id);
                }
                 await client.command.get('uniqueemojidirectmessage').execute(user);
            } else if (results.length < 1){
                await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting); // new sign up
            }

            dbconnection.end();
        })
    }
})

client.on("messageReactionRemove", async (reaction, user) => {
    if (user.bot) return;

    var dtChanId = getChannelId(client, 'dt-availability');
    var dtfChanId = getChannelId(client, 'dream-teams-friendly');
    var lfgChan = getChannelId(client, 'lfg-role-claim');
    var chanId = getChannelId(client, 'dream-teams-friendly');
    var logChan = getChannelId(client, 'dt-logs');

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.channel.id === chanId.id && reaction.message.id == await GetMessageId(client, 'roleclaim')){
        dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){

            var userReaction = await reaction.message.guild.members.cache.get(user.id);
            await userReaction.roles.remove(dtfRole.id);

        }
    } else if (reaction.message.channel.id === lfgChan.id && reaction.message.id == await GetMessageId(client, 'lfg')) {
        const pavlovRole = getRole(client, 'pavlov-lfg');
        const pop1Role = getRole(client, 'pop1-lfg');
        if (reaction.emoji.name === '🍆'){
            var lfgPavUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPavUser.roles.remove(pavlovRole.id);
        } else if (reaction.emoji.name === '💦') {
            var lfgPopUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPopUser.roles.remove(pop1Role.id);
        }
    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == await GetMessageId(client, 'eudtf')){

        client.command.get('managedb').execute('delete', 'event_signup_ids', user, client, isTesting);

    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == await GetMessageId(client, 'nadtf')){
        
        client.command.get('managedb').execute('delete', 'event_signup_ids', user, client, isTesting);

    } else if (reaction.message.channel.id === dtChanId.id) {

        var logDate = spacetime(spacetime.now).goto('America/New_York');

        if (reaction.message.id == await GetMessageId(client, 'dtav')) {
            // new log
            logChan.send(`**AV** ${user.username} Removed their reaction from ${await checkEmoji(reaction)} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`);
        } else if (reaction.message.id == await GetMessageId(client, 'dtmatch')) {
            // new log
            logChan.send(`**MATCH** ${user.username} Removed their reaction from MATCH announcement - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`);
        } else if (reaction.message.id !== await GetMessageId(client, 'dtmatch') && reaction.message.id !== await GetMessageId(client, 'dtav')) {
            // new log
            logChan.send(`**CUSTOM** ${user.username} Removed their reaction ${reaction.emoji.name} from ${reaction.message.content.toString()} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`);
        }
    }
})

// log deleted messages
client.on("messageDelete", async (messageDel) => {

    var chan = getChannelId(client, 'monke-deleted-messages');

    await Discord.Util.delayFor(100);

    if (!messageDel.partial){
        const fetchedLogs = await messageDel.guild.fetchAuditLogs({ // finds the last 6 deleted messages
            limit: 6,
            type: 'MESSAGE_DELETE'
        }).catch(() => ({
            entries: []
        }));
        
        const auditEntry = fetchedLogs.entries.find(a => 
        a.target.id === messageDel.author.id &&
        Date.now() - a.createdTimestamp < 20000
        ); // narrows down message options
    
        const executor = auditEntry ? auditEntry.executor.tag : messageDel.author.tag; // trys to find who deleted message

        // times
        var creationsDateNa = spacetime(messageDel.createdAt).goto('America/New_York');
        var creationsDateNaFormat = creationsDateNa.unixFmt('yyyy.MM.dd h:mm a');

        var timeStampNa = spacetime.now('America/New_York');
        var naDate = timeStampNa.unixFmt('yyyy.MM.dd h:mm a');

        var deletedEmbed = new Discord.MessageEmbed() // outputs log of deleted message
        .setTitle('DELETED MESSAGE')
        .setColor("ORANGE")
        .addField('Message', messageDel.content)
        .addField('Channel', messageDel.channel.name)
        .addField('Sent by', messageDel.author.username)
        .addField('Deleted by', executor)
        .addField('Creation and deletion', '**EST**' + '\n'
        + `C - ${creationsDateNaFormat}` + '\n'
        + `D - ${naDate}`)
    
        client.channels.cache.get(chan.id).send(deletedEmbed);
    }
})


client.login(process.env.token); //process.env.token    //require("./testToken.js")