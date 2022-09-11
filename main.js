const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});
const prefix = '-';
const spacetime = require('spacetime');
const schedule = require('node-schedule');
const isTesting = process.env.TESTING;
var getChannelId = require("./commands/getChannelId");
var GetMessageId = require("./commands/getMessageId");
var getRole = require("./commands/getRole");
var checkEmoji = require("./commands/checkEmoji");
var matchTime = require("./commands/getMatchTime");
require('dotenv').config();
const { exec } = require('child_process');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

exec("npm run test-awesome", (error, stdout, stderr) => {
    if (error){return console.log(`error: ${error.message}`);};
    if (stderr){return console.log(`stderr: ${stderr}`);};
    console.log(`stdout: ${stdout}`);
})

client.once('ready', async () => { // automatic commands
    const monkeChan = getChannelId(client, 'monke-bot');
    const logChan = getChannelId(client, 'dt-logs');
    monkeChan.send('🐒 online'); // ready message
    console.log('monke');
    
    // await Discord.Util.delayFor(5000);
    // let rawTestData = fs.readFileSync("./mochawesome-report/mochawesome.json");
    // let jsonTestData = JSON.parse(rawTestData);

    // // Test report
    // monkeChan.send(` 
    // Tests: ${jsonTestData.stats.tests}\n
    // 🟢Passed: ${jsonTestData.stats.passes}\n
    // 🔴Failed: ${jsonTestData.stats.failures}`)

    // if (jsonTestData.stats.failures > 0){
    //     for (let el of jsonTestData.results[0].suites[0].tests){
    //         if (el.state === "failed"){
    //             monkeChan.send(`
    //             Title: ${el.title.trim()}\nMessage: ${el.err.estack.trim()}\n`)
    //         }
    //     }
    // }

    matchTime(client, getChannelId(client, 'op-match-announcements'), isTesting);

    // Availability
    // EU
    schedule.scheduleJob('0 18 * * 0', () => { 
        console.log('monke do availability');
        try {

        client.command.get('autoAvailability').execute(client, getChannelId(client, 'op-availability'), getRole(client, 'op'));

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    schedule.scheduleJob('0 23 * * 0', () => { 
        console.log('monke do availability');
        try {
            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/biAvailabilityMessageIds.txt', "", options);
            
            client.command.get('dtAutoAvailability').execute(client, getChannelId(client, 'dt-availability'), getRole(client, 'dream')); 
            // client.command.get('octaneAutoAvailability').execute(client, getChannelId(client, 'octane-availability'), getRole(client, 'octane'));
            // add new log
            var logDate = spacetime(spacetime.now).goto('America/New_York');
            logChan.send(`**A new week ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}**\n`);
    
        } catch (error) {
            console.log(error);
        }

        console.log('monke done');
    })
})

client.on('message', async (message) => { 
    if (message.channel.id == getChannelId(client, 'op-match-announcements').id && message.content.includes('<t:')){
        var epoch = message.content.split(":");
        client.command.get('managedb').execute('insert', 'match_times', '', client, isTesting, epoch[1]);
    }

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const roleid = getRole(client, 'superpowers');
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
            try {
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
            } catch (error) {
                console.log(error);
            }
        }
    } else if (command === 'lfg') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            
            //client.command.get('lfgmessage').execute(client, Discord, getChannelId(client, 'lfg-role-claim'));

        }
    } else if (command === 'moveoct'){ // moves all users in the octane voice channel to fam-2 voice channel
        if (message.channel === getChannelId(client, 'monke-bot')){
            try {
                await client.command.get('movemembers').execute(message);
            } catch (error) {
                console.log(error);
            }
        }
    } else if (command === 'm' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){

        await client.command.get('newmatch').execute(args, getChannelId(client, 'op-match-announcements'), opRole.id, client, '', '', message); // creates new match announcement
    
    } else if (command === 'mdel' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){
        
        var chan1 = await getChannelId(client, 'op-match-announcements');
        var chan2 = await getChannelId(client, 'op-availability');
        var messages = await chan1.messages.fetch();
        var messages2 = await chan2.messages.fetch();
        var selectedMessage = await messages.find(msg => msg.id == args);
        var selectedMessage2 = await messages2.find(msg => msg.id == args);
        selectedMessage ? await selectedMessage.delete() : await selectedMessage2.delete()

    } else if (command === 'medit' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){

        var chan = await getChannelId(client, 'op-match-announcements');
        var messages = await chan.messages.fetch();
        var selectedMessage = await messages.find(msg => msg.id == args[0]);
        args.splice(0, 1);
        await client.command.get('newmatch').execute(args, getChannelId(client, 'op-match-announcements'), opRole.id, client, 'edit', selectedMessage, message);

    } else if (command === 'lfgedit' && message.channel === getChannelId(client, 'monke-bot') && message.author.id == '259466508814516224'){
        var LfgRoleMessage = await client.channels.cache.find(chan => chan.name == 'lfg-role-claim');
        var lfgMessages = await LfgRoleMessage.messages.fetch();
        var lfgRoleClaim = lfgMessages.find(msg => msg.content == '' && msg.author.bot == true);

        let embed = new Discord.MessageEmbed()
        .setTitle('Roles')
        .setColor("ORANGE")
        .setDescription('🍆 - Pavlov \n' + '💦 - Population One \n' + '🍑 - Walkabout \n' + '🎬 - Movie Night')

        lfgRoleClaim.edit(embed);
    }
})

client.on("messageReactionAdd", async (reaction, user) => { 
    if (user.bot) return;

    var opChanId = getChannelId(client, 'op-availability');
    var dtChanId = getChannelId(client, 'dt-availability');
    var octaneChanId = getChannelId(client, 'octane-availability');
    var lfgChan = getChannelId(client, 'lfg-role-claim');
    var logChan = getChannelId(client, 'dt-logs');

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.message.channel.id === lfgChan.id && reaction.message.id == await GetMessageId(client, 'lfg')) {
        const pavlovRole = getRole(client, 'pavlov-lfg');
        const pop1Role = getRole(client, 'pop1-lfg');
        const walkaboutRole = getRole(client, 'walkabout-lfg');
        const movieRole = getRole(client, 'movie-lfg');

        if (reaction.emoji.name === '🍆'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(pavlovRole.id); // gives reacted user pavlov role 
        } else if (reaction.emoji.name === '💦') {
            await reaction.message.guild.members.cache.get(user.id).roles.add(pop1Role.id); // gives reacted user population 1 role 
        } else if (reaction.emoji.name === '🍑'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(walkaboutRole.id);
        } else if (reaction.emoji.name === '🎬'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(movieRole.id);
        } else{
            reaction.remove();
        }
    } else if (reaction.message.channel.id === opChanId.id) {

        await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability 

    } else if (reaction.message.channel.id === octaneChanId.id) {
        try {
            await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability
        } catch (error) {
            console.log(error);
        }

    } else if (reaction.message.channel.id === dtChanId.id) { // DT
        try {
            var logDate = spacetime(spacetime.now).goto('America/New_York'); 
            var dtAvId = await GetMessageId(client, 'dtav');

            if (reaction.message.id == dtAvId) {
                await client.command.get('countreactions').execute(reaction, user); // checks sign ups for availability
                // new log
                logChan.send(`**AV** ${user.username} Added their reaction to ${await checkEmoji(reaction)} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`); // adds log if someone reacts
            } else if (reaction.message.id !== dtAvId) {
                // new log
                logChan.send(`**CUSTOM** ${user.username} Added their reaction ${reaction.emoji.name} to ${reaction.message.content.toString()} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`); // adds log if someone reacts
            }
        } catch (error) {
            console.log(error);
        }
    } 
})

client.on("messageReactionRemove", async (reaction, user) => {
    if (user.bot) return;

    var dtChanId = getChannelId(client, 'dt-availability');
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
        const walkaboutRole = getRole(client, 'walkabout-lfg');
        const movieRole = getRole(client, 'movie-lfg');

        if (reaction.emoji.name === '🍆'){
            var lfgPavUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPavUser.roles.remove(pavlovRole.id);
        } else if (reaction.emoji.name === '💦') {
            var lfgPopUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPopUser.roles.remove(pop1Role.id);
        }else if (reaction.emoji.name === '🍑'){
            var lfgWalkaboutUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgWalkaboutUser.roles.remove(walkaboutRole.id);
        }else if (reaction.emoji.name === '🎬'){
            var movieNightUser = await reaction.message.guild.members.cache.get(user.id);
            await movieNightUser.roles.remove(movieRole.id);
        }
    } else if (reaction.message.channel.id === dtChanId.id) {

        var logDate = spacetime(spacetime.now).goto('America/New_York');
        try {

            if (reaction.message.id == await GetMessageId(client, 'dtav')) {
                // new log
                logChan.send(`**AV** ${user.username} Removed their reaction from ${await checkEmoji(reaction)} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`);
            } else if (reaction.message.id !== await GetMessageId(client, 'dtav')) {
                // new log
                logChan.send(`**CUSTOM** ${user.username} Removed their reaction ${reaction.emoji.name} from ${reaction.message.content.toString()} - ${logDate.date()}/${logDate.format('iso-month')}/${logDate.year()}/${logDate.time()}\n`);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
})

// log deleted messages
client.on("messageDelete", async (messageDel) => {

    var chan = getChannelId(client, 'monke-deleted-messages');

    await Discord.Util.delayFor(100);

    if (messageDel.channel.id == getChannelId(client, 'op-match-announcements').id && messageDel.content.includes('<t:')){
        var epoch = messageDel.content.split(":");
        await client.command.get('managedb').execute('delete', 'match_times', '', client, isTesting, epoch[1]);
    }

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
    
        const executor = auditEntry ? auditEntry.executor.tag : messageDel.author.tag; // tries to find who deleted message

        // times
        var creationsDateNa = spacetime(messageDel.createdAt).goto('America/New_York');
        var creationsDateNaFormat = creationsDateNa.unixFmt('yyyy.MM.dd h:mm a');

        var timeStampNa = spacetime.now('America/New_York');
        var naDate = timeStampNa.unixFmt('yyyy.MM.dd h:mm a');
        try {
            var deletedEmbed = new Discord.MessageEmbed() // outputs log of deleted message
            .setTitle('DELETED MESSAGE')
            .setColor("ORANGE")
            .addField('Message', messageDel.content ? messageDel.content : "Message empty OR manual upload by user")
            .addField('Channel', messageDel.channel.name)
            .addField('Sent by', messageDel.author.username)
            .addField('Deleted by', executor)
            .addField('Creation and deletion', '**EST**' + '\n'
            + `C - ${creationsDateNaFormat}` + '\n'
            + `D - ${naDate}`)
        
            client.channels.cache.get(chan.id).send(deletedEmbed);
        } catch (error) {
            console.log(error);
        }
    }
})

client.login(process.env.token);
