const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

const fs = require('fs');

//const token = require("./token.js");

var schedule = require('node-schedule');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

client.once('ready', () => { // automatic commands
    console.log('monke');
    const opAvailabilityId = client.channels.cache.find(ch => ch.name === 'op-availability');
    const dtAvailabilityId = client.channels.cache.find(ch => ch.name === 'dt-availability');
    const opMatchAnnouncement = client.channels.cache.find(ch => ch.name === 'op-match-announcements');
    const dtMatchAnnouncement = client.channels.cache.find(ch => ch.name === 'dt-match-announcements');
    const biAvailabilityId = client.channels.cache.find(ch => ch.name === 'bi-availability');
    //const mixedFriendlyAnnouncement = client.channels.cache.find(ch => ch.name === 'op-availability');
    //const roleClaim = client.channels.cache.find(ch => ch.name === 'op-availability');

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

    // Mixed friendly
    schedule.scheduleJob('30 22 * * 1', () => { //30 22 * * 1 - correct time for mxf
        console.log('monke do mxf');
        try {
            //mixedFriendlyAnnouncement.send(client.command.get('mixedFriendlyAnnouncement').execute(client));
        } catch (q) {
            console.log(q);
        } finally{
            console.log('monke done. *monke noises* ');
        }
    })
})

client.on('message', message => { // manual commands
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const roleid = "804193355046191115";

    if (command === 'id'){
        message.channel.send(message.channel.id);
    } else if (command === 'slow') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid)) { 
            client.command.get('slowmode').execute(message, args);
        }
    }
})

// Welcome message
// client.on('guildMemberAdd', member => {
//     console.log('user joined');
//     const channelID = member.guild.channels.cache.find(ch => ch.name === 'welcome');
//     client.command.get('welcomeMessage').execute(channelID, client, member, Discord);
// })

client.login(process.env.token); //process.env.token