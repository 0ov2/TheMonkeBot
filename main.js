const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

const fs = require('fs');

var getChannelId = require("./commands/getChannelId");

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
    var mxfChannel = getChannelId(client, 'mxf-general');
    //var superpowersChan = getChannelId(client, 'superpowers');
    //var roleClaim = getChannelId(client, '');

    // role claim message
    //roleClaim.send(client.command.get('roleclaim').execute(client, Discord));

    // Availability
    schedule.scheduleJob('0 10 * * 1', () => {  //* * * * * , 0 10 * * 1
        console.log('monke do availability');
        try {

        opAvailabilityId.send(client.command.get('autoAvailability').execute(client, opAvailabilityId.id)); // handle errors 
        dtAvailabilityId.send(client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId.id)); // handle errors 
        biAvailabilityId.send(client.command.get('biAutoAvailability').execute(client, biAvailabilityId.id));//
        opMatchAnnouncement.send(client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement.id));
        dtMatchAnnouncement.send(client.command.get('dtMatchAnnouncement').execute(client, dtMatchAnnouncement.id));

        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // auto Mixed friendly
    schedule.scheduleJob('30 19 * * 0', () => { //30 19 * * 0 - real time
        superpowersChan.send("-mxf");
    })
    schedule.scheduleJob('0 23 * * 0', () => { //0 23 * * 0
        superpowersChan.send("-mxfdel");
    })

    schedule.scheduleJob('0 10 * * 1', () => {
        mxfChannel.send("-role");
    })
})

client.on('message', message => { // manual commands

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const myGuild = client.guilds.cache.get(message.guild.id);
    const roleid = myGuild.roles.cache.find(role => role.name === 'superpowers');

    if (command === 'slow') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            client.command.get('slowmode').execute(message, args);
        }
    } else if (command === 'av') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            var opAvailabilityId = getChannelId(client, 'op-availability');
            client.command.get('autoAvailability').execute(client, opAvailabilityId.id);
        }
    } else if (command === 'mxf') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            client.command.get('createmxfchannels').execute(client, message, Discord);
            
        }
    } else if (command === 'mxfdel') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)){
            client.command.get('deletemxfchannels').execute(client, message);
        }
    } else if (command === 'role') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) {
            const myGuild = client.guilds.cache.get(message.guild.id);
            const mxfRole = myGuild.roles.cache.find(role => role.name === 'MXF');
            var mxfGeneralId = getChannelId(client, 'mxf-general');
            mxfGeneralId.send(client.command.get('mixedFriendlyAnnouncement').execute(client, Discord, mxfRole));
            message.delete();
        }
    }
})

// Welcome message
// client.on('guildMemberAdd', member => {
//     console.log('user joined');
//     const channelID = member.guild.channels.cache.find(ch => ch.name === 'welcome');
//     client.command.get('welcomeMessage').execute(channelID, client, member, Discord);
// })

client.login(process.env.token); //process.env.token  //require("./token.js")