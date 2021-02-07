const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

const fs = require('fs');

var getChannelId = require("./commands/getChannelId");

var getRole = require("./commands/getRole");

var schedule = require('node-schedule');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

client.once('ready', () => { // automatic commands
    console.log('monke');

    var opAvailabilityId = getChannelId(client, 'op-availability');
    var dtAvailabilityId = getChannelId(client, 'dt-availability');
    var opMatchAnnouncement = getChannelId(client, 'op-match-announcements');
    var dtMatchAnnouncement = getChannelId(client, 'dt-match-announcements');
    var biAvailabilityId = getChannelId(client, 'bi-availability');
    var monkeChan = getChannelId(client, 'monke-bot');

    const opRole = getRole(client, 'op');
    const dtRole = getRole(client, 'dream');
    const biRole = getRole(client, 'bi');

    // Availability
    // EU
    schedule.scheduleJob('0 18 * * 0', () => {  //* * * * * , 0 18 * * 0
        console.log('monke do availability');
        try {

        client.command.get('autoAvailability').execute(client, opAvailabilityId.id, opRole);
        client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement.id, opRole);

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // NA
    schedule.scheduleJob('0 23 * * 0', () => { //0 23 * * 0
        console.log('monke do availability');
        try {

            client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId.id, dtRole); 
            client.command.get('tempBiAutoAvailability').execute(client, biAvailabilityId.id, biRole);
            client.command.get('dtMatchAnnouncement').execute(client, dtMatchAnnouncement.id, dtRole);
    
        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // auto Mixed friendly
    schedule.scheduleJob('0 20 * * 6', () => { //30 19 * * 6 - real time
        monkeChan.send("-dtf");
    })
    schedule.scheduleJob('0 1 * * 0', () => { //0 23 * * 6
        monkeChan.send("-dtfdel");
    })
    schedule.scheduleJob('30 18 * * 0', () => { //0 18 * * 0
        monkeChan.send("-role");
    })
})

client.on('message', message => { // manual commands

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const roleid = getRole(client, 'superpowers');
    const monkeRole = getRole(client, 'Monke');
    const opRole = getRole(client, 'op');
    const dreamRole = getRole(client, 'dream');
    const biRole = getRole(client, 'bi');

    if (command === 'slow') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            client.command.get('slowmode').execute(message, args);
        }
    } else if (command === 'av') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 

            var opAvailabilityId = getChannelId(client, 'op-availability');
            var dtAvailabilityId = getChannelId(client, 'dt-availability');
            var biAvailabilityId = getChannelId(client, 'bi-availability');
            var opMatchAnnouncement = getChannelId(client, 'op-match-announcements');
            var dtMatchAnnouncement = getChannelId(client, 'dt-match-announcements');

            if (message.channel.id === opAvailabilityId.id) {
                client.command.get('autoAvailability').execute(client, opAvailabilityId.id, opRole.id);
            }else if (message.channel.id === dtAvailabilityId.id) {
                client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId.id, dreamRole.id);
            }else if (message.channel.id === biAvailabilityId.id) {
                client.command.get('tempBiAutoAvailability').execute(client, biAvailabilityId.id, biRole.id);
            }else if (message.channel.id === opMatchAnnouncement.id) {
                client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement.id, opRole.id);
            }else if (message.channel.id === dtMatchAnnouncement.id) {
                client.command.get('dtMatchAnnouncement').execute(client, dtMatchAnnouncement.id, dreamRole.id);
            }else {
                return;
            }
            
            message.delete();
        }
    } else if (command === 'dtf') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.author.bot){
            client.command.get('createmxfchannels').execute(message);
        }
    } else if (command === 'dtfdel') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.author.bot){
            client.command.get('deletemxfchannels').execute(message);
        }
    } else if (command === 'lfg') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            client.command.get('lfgmessage').execute(client, Discord, message);
        }
    }else if (command === 'role') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            client.command.get('mixedFriendlyAnnouncement').execute(client, Discord, message);
            client.command.get('dtfmessage').execute(client, message);
        }
    }
})

//client.command.get('roleClaimMessageReaction').execute(client);
// role claim
client.on("messageReactionAdd", async (reaction, user) => {
    var dtfChanId = getChannelId(client, 'dream-teams-friendly');
    var opChanId = getChannelId(client, 'op-availability');
    var dtChanId = getChannelId(client, 'dt-availability');
    var biChanId = getChannelId(client, 'bi-availability');

    var options = {encoding: 'utf-8', flag: 'r'};
    var dtfMessageId = fs.readFileSync('./roleClaimMessage.txt', options);
    var opMessageId = fs.readFileSync('./opAvailabilityMessage.txt', options);
    var dtMessageId = fs.readFileSync('./dtAvailabilityMessage.txt', options);
    var biMessageId = fs.readFileSync('./biAvailabilityMessage.txt', options);

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == dtfMessageId){
        dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id);
        }
    } else if (reaction.message.channel.id === opChanId.id && reaction.message.id == opMessageId) {
        await client.command.get('countreactions').execute(reaction, user, 'op');
    } else if (reaction.message.channel.id === dtChanId.id && reaction.message.id == dtMessageId) {
        await client.command.get('countreactions').execute(reaction, user, 'dt');
    } else if (reaction.message.channel.id === biChanId.id && reaction.message.id == biMessageId) {
        await client.command.get('countreactions').execute(reaction, user, 'bi');
    } else {
        return;
    }
})

client.on("messageReactionRemove", async (reaction, user) => {
    var chanId = getChannelId(client, 'dream-teams-friendly');
    var options = {encoding: 'utf-8', flag: 'r'};
    var messageId = fs.readFileSync('./roleClaimMessage.txt', options);

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.channel.id === chanId.id && reaction.message.id == messageId){
        dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(dtfRole.id);
        }
    } else {
        return;
    }
})

client.login(process.env.token); //process.env.token  //require("./token.js")     //require("./testToken.js")