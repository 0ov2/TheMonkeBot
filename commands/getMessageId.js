async function GetMessageId(client, messageType) {
    if (messageType == 'roleclaim'){

        var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
        var messages = await dtfRoleMessage.messages.fetch();
        var roleClaim = messages.find(msg => msg.content == '' && msg.author.bot == true);
        return roleClaim.id;

    } else if (messageType == 'eudtf'){

        var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
        var messages = await dtfRoleMessage.messages.fetch();
        var dtfEuId = messages.find(msg => msg.content.includes(':regional_indicator_e:') && msg.author.bot == true);
        return dtfEuId.id;

    }else if (messageType == 'nadtf'){

        var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
        var messages = await dtfRoleMessage.messages.fetch();
        var dtfNaId = messages.find(msg => msg.content.includes(':regional_indicator_n:') && msg.author.bot == true);
        return dtfNaId.id;

    }else if (messageType == 'opav'){

        var opChan = await client.channels.cache.find(chan => chan.name == 'op-availability');
        var opMessages = await opChan.messages.fetch();
        var opAvMessage = opMessages.find(msg => msg.content.includes('Monday') && msg.author.bot == true);
        return opAvMessage.id;

    }else if (messageType == 'dtav'){

        var dtChan = await client.channels.cache.find(chan => chan.name == 'dt-availability');
        var dtMessages = await dtChan.messages.fetch();
        var dtAvMessage = dtMessages.find(msg => msg.content.includes('A - Monday night') && msg.author.bot == true);
        return dtAvMessage.id;

    }else if (messageType == 'lfg'){

        var LfgRoleMessage = await client.channels.cache.find(chan => chan.name == 'lfg-role-claim');
        var lfgMessages = await LfgRoleMessage.messages.fetch();
        var lfgRoleClaim = lfgMessages.find(msg => msg.content == '' && msg.author.bot == true);
        return lfgRoleClaim.id;

    } else if (messageType == 'octaneav'){
        var octaneIds = [];
        var BiChan = await client.channels.cache.find(chan => chan.name == 'octane-availability');
        var BiMessages = await BiChan.messages.fetch();
        var BiAvMessageSun = BiMessages.find(msg => msg.content.includes('Sunday') && msg.author.bot == true);
        var BiAvMessageSat = BiMessages.find(msg => msg.content.includes('Saturday') && msg.author.bot == true);
        var BiAvMessageFri = BiMessages.find(msg => msg.content.includes('Friday') && msg.author.bot == true);
        var BiAvMessageThu = BiMessages.find(msg => msg.content.includes('Thursday') && msg.author.bot == true);
        var BiAvMessageWed = BiMessages.find(msg => msg.content.includes('Wednesday') && msg.author.bot == true);
        var BiAvMessageTue = BiMessages.find(msg => msg.content.includes('Tuesday') && msg.author.bot == true);
        var BiAvMessageMon = BiMessages.find(msg => msg.content.includes('Monday') && msg.author.bot == true);
        
        return octaneIds = [BiAvMessageMon.id, BiAvMessageTue.id, BiAvMessageWed.id, BiAvMessageThu.id,
            BiAvMessageFri.id, BiAvMessageSat.id, BiAvMessageSun.id];
    }
}

module.exports = GetMessageId;