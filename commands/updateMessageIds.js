var fs = require('fs');
var getRole = require('./getRole');

async function updateMessageIds(client) {
    //DTF role claim
    var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
    var messages = await dtfRoleMessage.messages.fetch();
    var roleClaim = messages.find(msg => msg.content == '' && msg.author.bot == true);

    var options = {encoding: 'utf-8', flag: 'w'};
    fs.writeFileSync('./messageIDs/roleClaimMessage.txt', roleClaim.id, options);

    //DTF av
    var dtfEuAv = messages.find(msg => msg.content.includes('🇪 🇺') && msg.author.bot == true); //eu
    fs.writeFileSync('./messageIDs/euDtfMessageId.txt', dtfEuAv.id, options);

    var dtfNaAv = messages.find(msg => msg.content.includes('🇳 🇦') && msg.author.bot == true); //na
    fs.writeFileSync('./messageIDs/naDtfMessageId.txt', dtfNaAv.id, options);

    //Team av
    // BI
    var BiChan = await client.channels.cache.find(chan => chan.name == 'bi-availability');
    var BiMessages = await BiChan.messages.fetch();
    var BiAvMessageSun = BiMessages.find(msg => msg.content.includes('Sunday') && msg.author.bot == true);
    var BiAvMessageSat = BiMessages.find(msg => msg.content.includes('Saturday') && msg.author.bot == true);
    var BiAvMessageFri = BiMessages.find(msg => msg.content.includes('Friday') && msg.author.bot == true);
    var BiAvMessageThu = BiMessages.find(msg => msg.content.includes('Thursday') && msg.author.bot == true);
    var BiAvMessageWed = BiMessages.find(msg => msg.content.includes('Wednesday') && msg.author.bot == true);
    var BiAvMessageTue = BiMessages.find(msg => msg.content.includes('Tuesday') && msg.author.bot == true);
    var BiAvMessageMon = BiMessages.find(msg => msg.content.includes('Monday') && msg.author.bot == true);

    fs.writeFileSync('./messageIDs/biAvailabilityMessageIds.txt', BiAvMessageSun.id + "\n"
     + BiAvMessageSat.id + "\n"
     + BiAvMessageFri.id + "\n"
     + BiAvMessageThu.id + "\n"
     + BiAvMessageWed.id + "\n"
     + BiAvMessageTue.id + "\n"
     + BiAvMessageMon.id + "\n", options);

    // Dream
    var DreamChan = await client.channels.cache.find(chan => chan.name == 'dt-availability');
    var DreamMessages = await DreamChan.messages.fetch();
    var dtRole = getRole(client, 'dream');
    var DreamAvMessage = DreamMessages.find(msg => msg.content.includes(dtRole.id) && msg.author.bot == true);
    fs.writeFileSync('./messageIDs/dtAvailabilityMessage.txt', DreamAvMessage.id, options);

    var DreamMatchChan = await client.channels.cache.find(chan => chan.name == 'dt-match-announcements');
    var DreamMatchMessages = await DreamMatchChan.messages.fetch();
    var DreamMatchMessage = DreamMatchMessages.find(msg => msg.content.includes(dtRole.id) && msg.author.bot == true);
    fs.writeFileSync('./messageIDs/dtMatchAnnouncementID.txt', DreamMatchMessage.id, options);

    // OP
    var opChan = await client.channels.cache.find(chan => chan.name == 'op-availability');
    var opMessages = await opChan.messages.fetch();
    var opRole = getRole(client, 'op');
    var opAvMessageSun = opMessages.find(msg => msg.content.includes(opRole.id) && msg.author.bot == true);
    fs.writeFileSync('./messageIDs/opAvailabilityMessage.txt', opAvMessageSun.id, options);

    var opMatchChan = await client.channels.cache.find(chan => chan.name == 'op-match-announcements');
    var opatchMessages = await opMatchChan.messages.fetch();
    var opMatchMessage = opatchMessages.find(msg => msg.content.includes(opRole.id) && msg.author.bot == true);
    fs.writeFileSync('./messageIDs/opMatchAnnouncementID.txt', opMatchMessage.id, options);
}

module.exports = updateMessageIds;
