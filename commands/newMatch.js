module.exports = {
    name: 'newmatch',
    async execute(args, chan, opRole, client, edit, selectedMessage, message) {
        const spacetime = require('spacetime');
        var s = spacetime.now('Europe/London');
        var dateConetents = [];

        if (args[0]){
            if (args[0] === 'mon'){
                var day = s.day('monday');
                dateConetents.push(`Monday ${day.format('{date-pad}')} ${day.format('month')}, `);
            } else if (args[0] === 'tue'){
                var day = s.day('tuesday');
                dateConetents.push(`Tuesday ${day.format('{date-pad}')} ${day.format('month')}, `);
            }else if (args[0] === 'wed'){
                var day = s.day('wednesday');
                dateConetents.push(`Wednesday ${day.format('{date-pad}')} ${day.format('month')}, `);
            }else if (args[0] === 'thu'){
                var day = s.day('thursday');
                dateConetents.push(`Thursday ${day.format('{date-pad}')} ${day.format('month')}, `);
            }else if (args[0] === 'fri'){
                var day = s.day('friday');
                dateConetents.push(`Friday ${day.format('{date-pad}')} ${day.format('month')}, `);
            }else if (args[0] === 'sat'){
                var day = s.day('saturday');
                dateConetents.push(`Saturday ${day.format('{date-pad}')} ${day.format('month')}, `);
            }else if (args[0] === 'sun'){
                var day = s.day('sunday');
                dateConetents.push(`Sunday ${day.format('{date-pad}')} ${day.format('month')}, `);
            } else{
                message.react('❌');
                return;
            }
        } else{
            message.react('❌');
            return;
        }

        if (args[1] && parseInt(args[1], 10)){
            dateConetents.push(args[1] + ' UTC');
        }else{
            message.react('❌');
            return;
        }

        if (args[2]){
            dateConetents.push('vs ' + args[2]);
        } else{
            message.react('❌');
            return;
        }

        if (args[3]){
            if (args[3] === 'l'){
                dateConetents.push('**League Match**');
            }else if (args[3] === 's'){
                dateConetents.push('**Scrim**');
            }
        }else{
            message.react('❌');
            return;
        }

        var newDate = '';
        for (let i = 0; i < dateConetents.length; i++) {
            newDate = newDate + dateConetents[i] + ' ';
        }
        
        if (!edit){
            client.channels.cache.get(chan.id).send("<@&" + opRole + "> " + newDate)
            message.react('✅');
        }else {
            selectedMessage.edit("<@&" + opRole + "> " + newDate);
            message.react('✅');
        }
    }
}