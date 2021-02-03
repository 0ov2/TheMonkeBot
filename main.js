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
    var mxfChannel = getChannelId(client, 'dream-teams-friendly');

    // Availability
    // EU
    schedule.scheduleJob('0 18 * * 0', () => {  //* * * * * , 0 18 * * 0
        console.log('monke do availability');
        try {

        opAvailabilityId.send(client.command.get('autoAvailability').execute(client, opAvailabilityId.id));
        opMatchAnnouncement.send(client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement.id));

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })
    // NA
    schedule.scheduleJob('0 23 * * 0', () => {
        console.log('monke do availability');
        try {

            dtAvailabilityId.send(client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId.id)); 
            biAvailabilityId.send(client.command.get('biAutoAvailability').execute(client, biAvailabilityId.id));
            dtMatchAnnouncement.send(client.command.get('dtMatchAnnouncement').execute(client, dtMatchAnnouncement.id));
    
        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // auto Mixed friendly
    schedule.scheduleJob('30 19 * * 6', () => { //30 19 * * 6 - real time
        superpowersChan.send("-dtf");
    })
    schedule.scheduleJob('0 23 * * 6', () => { //0 23 * * 6
        superpowersChan.send("-dtfdel");
    })
    schedule.scheduleJob('0 18 * * 0', () => { //0 18 * * 0
        mxfChannel.send("-role");
    })
})

client.on('message', message => { // manual commands

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const roleid = getRole(client, 'superpowers', message);

    if (command === 'slow') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            client.command.get('slowmode').execute(message, args);
        }
    } else if (command === 'av') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 

            var opAvailabilityId = getChannelId(client, 'op-availability');
            var dtAvailabilityId = getChannelId(client, 'dt-availability');
            var biAvailabilityId = getChannelId(client, 'bi-availability');

            if (message.channel.id === opAvailabilityId.id) {
                client.command.get('autoAvailability').execute(client, opAvailabilityId.id);
            }else if (message.channel.id === dtAvailabilityId.id) {
                client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId.id);
            }else if (message.channel.id === biAvailabilityId.id) {
                client.command.get('biAutoAvailability').execute(client, biAvailabilityId.id);
            }else {
                message.delete();
                return;
            }
            
            message.delete();
        }
    } else if (command === 'dtf') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.author.bot){
            client.command.get('createmxfchannels').execute(message);
            message.delete();
        }
    } else if (command === 'dtfdel') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.author.bot){
            client.command.get('deletemxfchannels').execute(message);
            message.delete();
        }
    } else if (command === 'lfg') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            client.command.get('lfgmessage').execute(client, Discord, message);
            message.delete();
        }
    }else if (command === 'role') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) {
            client.command.get('mixedFriendlyAnnouncement').execute(client, Discord, message);
            message.delete();
        }
    }
})

client.login(process.env.token); //process.env.token  //require("./token.js")     //require("./testToken.js")