const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

const fs = require('fs');

//const token = require("./token.js");

const botMembers = require("./botMembers");

var schedule = require('node-schedule');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

client.once('ready', () => { // automatic commands
    console.log('monke');
    console.log(botMembers);

    var opAvailabilityId = client.channels.cache.get("761305181827629076"); // 796857177796378654
    var dtAvailabilityId = client.channels.cache.get("761305214677811210");
    var opMatchAnnouncement = client.channels.cache.get("803397507182624778"); // 796857249921630238
    var dtMatchAnnouncement = client.channels.cache.get("803432126836899901");
    var mixedFriendlyAnnouncement = client.channels.cache.get("803417327210201108");
    var roleClaim = client.channels.cache.get("803779865190203422");

    // role claim message
    //roleClaim.send(client.command.get('roleclaim').execute(client, Discord));

    // Availability
    schedule.scheduleJob('* * * * *', () => {  //0 10 * * 1 - correct time avail
        console.log('monke do availability');
        try {
       
        //opAvailabilityId.send(client.command.get('autoAvailability').execute(client)); // handle errors 
        //dtAvailabilityId.send(client.command.get('dtAutoAvailability').execute(client)); // handle errors 
        //opMatchAnnouncement.send(client.command.get('opMatchAnnouncement').execute(client));
        //dtMatchAnnouncement.send(client.command.get('dtMatchAnnouncement').execute(client));
        
        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // Mixed friendly
    schedule.scheduleJob('* * * * *', () => { //30 22 * * 1 - correct time for mxf
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

    if (command === 'id'){
        message.channel.send(message.channel.id);
    } else if (command === 'role') {
        client.command.get('roleclaim').execute(message, client);
        message.delete();
    } else if (command === 'clear') {
        client.command.get('clear').execute(message, args);
    } else if (command === 'slow') {
        client.command.get('slowmode').execute(message, args);
        message.delete();
    }
})

client.on('guildMemberAdd', member => {
    console.log('user joined');
    const channelID = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    client.command.get('welcomeMessage').execute(channelID, client, member, Discord);
})

client.login(process.env.token);