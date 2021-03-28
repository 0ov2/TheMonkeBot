const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});

const prefix = '-';

const fs = require('fs');

const spacetime = require('spacetime');

var getChannelId = require("./commands/getChannelId");

var getRole = require("./commands/getRole");

var checkSignUp = require("./commands/checkSignUp");

var updateMessageIds = require("./commands/updateMessageIds");

var checkBiMessageId = require("./commands/checkBiMessageId");

var schedule = require('node-schedule');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.command.set(command.name, command);
}

client.once('ready', async () => { // automatic commands
    console.log('monke');

    updateMessageIds(client);

    var monkeChan = getChannelId(client, 'monke-bot');

    await client.command.get('managesignups').execute('', '', client, 'update');

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
            client.command.get('biAutoAvailability').execute(client, getChannelId(client, 'bi-availability'), getRole(client, 'bi'));
    
        } catch (error) {
            console.log(error);
        }

        console.log('monke done. *monke noises*');
    })

    // auto Mixed friendly
    schedule.scheduleJob('59 18 * * 6', () => { //30 19 * * 6 - real time
        monkeChan.send("-dtf");
    })
    schedule.scheduleJob('0 2 * * 0', () => { //0 23 * * 6
        monkeChan.send("-dtfdel");
    })
    schedule.scheduleJob('30 18 * * 0', () => { //
        monkeChan.send("-role");
    })
    schedule.scheduleJob('0 19 * * 6', () => { //30 19 * * 6 - real time
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
    const biRole = getRole(client, 'bi');

    if (command === 'slow') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            client.command.get('slowmode').execute(message, args);
        }
    } else if (command === 'av') {
        if (message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id)) { 
            var stream = fs.createWriteStream("./messageIDs/biAvailabilityMessageIds.txt", {flags:'w'});

            var opAvailabilityId = getChannelId(client, 'op-availability');
            var dtAvailabilityId = getChannelId(client, 'dt-availability');
            var biAvailabilityId = getChannelId(client, 'bi-availability');
            var opMatchAnnouncement = getChannelId(client, 'op-match-announcements');

            if (message.channel.id === opAvailabilityId.id) {
                client.command.get('autoAvailability').execute(client, opAvailabilityId, opRole.id);
            }else if (message.channel.id === dtAvailabilityId.id) {
                client.command.get('dtAutoAvailability').execute(client, dtAvailabilityId, dreamRole.id);
                client.command.get('dtMatchAnnouncement').execute(client, getChannelId(client, 'dt-availability'), getRole(client, 'dream'));
            }else if (message.channel.id === biAvailabilityId.id) {
                stream.write("");
                client.command.get('biAutoAvailability').execute(client, biAvailabilityId, biRole.id);
            }else if (message.channel.id === opMatchAnnouncement.id) {
                client.command.get('opMatchAnnouncement').execute(client, opMatchAnnouncement, opRole.id);
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
            
            //client.command.get('lfgmessage').execute(client, Discord, getChannelId(client, 'lfg-role-claim'));

        }
    } else if (command === 'role') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            
            client.command.get('mixedFriendlyAnnouncement').execute(client, Discord, message);
            client.command.get('dtfmessage').execute(client, message);

            var stream = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'w'});
            stream.write("");
        }
    } else if (command === 'rem') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
           
            var chan = getChannelId(client, 'dream-teams-friendly');
            client.command.get('dtfreminder').execute(client, chan);

        }
    } else if (command === 'remadd') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
           
            await client.command.get('managesignups').execute(args, message, client, 'add');

        }
    } else if (command === 'remdel') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
           
            await client.command.get('managesignups').execute(args, message, client, 'del');

        }
    } else if (command === 'remcheck') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            
            var chan = getChannelId(client, 'monke-bot');
            await client.command.get('dtfchecksignedup').execute(chan, client);

        }
    } else if (command === 'remupdate') {
        if (message.author.bot || message.guild.members.cache.get(message.member.id).roles.cache.has(roleid.id) || message.guild.members.cache.get(message.member.id).roles.cache.has(monkeRole.id)) {
            
            await client.command.get('managesignups').execute(args, message, client, 'update');

        }
    }
})

client.on("messageReactionAdd", async (reaction, user) => {
    var dtfChanId = getChannelId(client, 'dream-teams-friendly');
    var opChanId = getChannelId(client, 'op-availability');
    var dtChanId = getChannelId(client, 'dt-availability');
    var biChanId = getChannelId(client, 'bi-availability');
    var opMatchChanId = getChannelId(client, 'op-match-announcements');
    var lfgChan = getChannelId(client, 'lfg-role-claim');
    
    var options = {encoding: 'utf-8', flag: 'r'};
    var dtfMessageId = fs.readFileSync('./messageIDs/roleClaimMessage.txt', options);
    var euDtfMessageId = fs.readFileSync('./messageIDs/euDtfMessageId.txt', options);
    var naDtfMessageId = fs.readFileSync('./messageIDs/naDtfMessageId.txt', options);
    var opMessageId = fs.readFileSync('./messageIDs/opAvailabilityMessage.txt', options);
    var dtMessageId = fs.readFileSync('./messageIDs/dtAvailabilityMessage.txt', options);
    var opMatchMessageId = fs.readFileSync('./messageIDs/opMatchAnnouncementID.txt', options);
    var dtMatchMessageId = fs.readFileSync('./messageIDs/dtMatchAnnouncementID.txt', options);
    var lfgMessageId = fs.readFileSync('./messageIDs/lfgMessageId.txt', options);
    var stream = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'a'});
    var checkBi = await checkBiMessageId(reaction)

    if (user.bot) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == dtfMessageId){
        dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id);
        }
    } else if (reaction.message.channel.id === lfgChan.id && reaction.message.id == lfgMessageId) {
        const pavlovRole = getRole(client, 'pavlov-lfg');
        const pop1Role = getRole(client, 'pop1-lfg');
        if (reaction.emoji.name === '🍆'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(pavlovRole.id);
        } else if (reaction.emoji.name === '💦') {
            await reaction.message.guild.members.cache.get(user.id).roles.add(pop1Role.id);
        }
    } else if (reaction.message.channel.id === opChanId.id && reaction.message.id == opMessageId) {

        await client.command.get('countreactions').execute(reaction, user, 'op');

    } else if (reaction.message.channel.id === dtChanId.id && reaction.message.id == dtMessageId) {

        await client.command.get('countreactions').execute(reaction, user, 'dt');

    } else if (reaction.message.channel.id === biChanId.id && checkBi > 0 && user.bot == false) {

        await client.command.get('countreactions').execute(reaction, user, 'bi');

    } else if (reaction.message.channel.id === opMatchChanId.id && reaction.message.id == opMatchMessageId) {

        await client.command.get('countreactions').execute(reaction, user, 'opmatch');

    } else if (reaction.message.channel.id === dtChanId.id && reaction.message.id == dtMatchMessageId) {

        await client.command.get('countreactions').execute(reaction, user, 'dtmatch');

    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == euDtfMessageId || reaction.message.channel.id === dtfChanId.id && reaction.message.id == naDtfMessageId) {
        var check = await checkSignUp(user);
        if (reaction.count > 1 && check < 1) { // Stacking emojis
            if (!reaction._emoji.id) {
                await stream.write(user.id + "\n");
                reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                console.log(user.id + ' ' + user.username + ' tried to stack an emoji');
            } else {
                await stream.write(user.id + "\n");
                reaction.message.reactions.resolve(reaction._emoji.id).users.remove(user.id);
                console.log(user.id + ' ' + user.username + ' tried to stack an emoji');
            }

            await client.command.get('directmessage').execute(user);
        }else if (check > 0){
            if (!reaction._emoji.id){
                await stream.write(user.id + "\n");
                reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                console.log(user.id + ' ' + user.username + ' tried to sign up while signed up.');
            } else{
                await stream.write(user.id + "\n");
                reaction.message.reactions.resolve(reaction._emoji.id).users.remove(user.id);
                console.log(user.id + ' ' + user.username + ' tried to sign up while signed up.');
            }
            
            await client.command.get('uniqueemojidirectmessage').execute(user);
        }else{
            await stream.write(user.id + "\n");
            console.log(user.id + ' ' + user.username + ' has signed up');
        }
    }
})

client.on("messageReactionRemove", async (reaction, user) => {
    var optionsR = {encoding: 'utf-8', flag: 'r'};

    var dtfChanId = getChannelId(client, 'dream-teams-friendly');
    var lfgChan = getChannelId(client, 'lfg-role-claim');
    var chanId = getChannelId(client, 'dream-teams-friendly');

    var lfgMessageId = fs.readFileSync('./messageIDs/lfgMessageId.txt', optionsR);
    var euDtfMessageId = fs.readFileSync('./messageIDs/euDtfMessageId.txt', optionsR);
    var naDtfMessageId = fs.readFileSync('./messageIDs/naDtfMessageId.txt', optionsR);

    var messageId = fs.readFileSync('./messageIDs/roleClaimMessage.txt', optionsR);

    if (user.bot) return;

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.channel.id === chanId.id && reaction.message.id == messageId){
        dtfRole = getRole(client, 'dtf');
        if (reaction.emoji.name === '🦧'){

            var userReaction = await reaction.message.guild.members.cache.get(user.id);
            await userReaction.roles.remove(dtfRole.id);

        }
    } else if (reaction.message.channel.id === lfgChan.id && reaction.message.id == lfgMessageId) {
        const pavlovRole = getRole(client, 'pavlov-lfg');
        const pop1Role = getRole(client, 'pop1-lfg');
        if (reaction.emoji.name === '🍆'){
            var lfgPavUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPavUser.roles.remove(pavlovRole.id);
        } else if (reaction.emoji.name === '💦') {
            var lfgPopUser = await reaction.message.guild.members.cache.get(user.id);
            await lfgPopUser.roles.remove(pop1Role.id);
        }
    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == euDtfMessageId){

        await client.command.get('removesignupid').execute(user);

    } else if (reaction.message.channel.id === dtfChanId.id && reaction.message.id == naDtfMessageId){
        
        await client.command.get('removesignupid').execute(user);

    }
})

// log deleted messages
client.on("messageDelete", async (messageDel) => {

    var chan = getChannelId(client, 'monke-deleted-messages');

    await Discord.Util.delayFor(100);

    if (!messageDel.partial){
        const fetchedLogs = await messageDel.guild.fetchAuditLogs({
            limit: 6,
            type: 'MESSAGE_DELETE'
        }).catch(() => ({
            entries: []
        }));
        
        const auditEntry = fetchedLogs.entries.find(a =>
        a.target.id === messageDel.author.id &&
        Date.now() - a.createdTimestamp < 20000
        );
    
        const executor = auditEntry ? auditEntry.executor.tag : messageDel.author.tag;

        // times
        var creationsDateNa = spacetime(messageDel.createdAt).goto('America/New_York');
        var creationsDateNaFormat = creationsDateNa.unixFmt('yyyy.MM.dd h:mm a');

        var timeStampNa = spacetime.now('America/New_York');
        var naDate = timeStampNa.unixFmt('yyyy.MM.dd h:mm a');

        var deletedEmbed = new Discord.MessageEmbed()
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