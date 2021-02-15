const fs = require("fs");
module.exports = {
    name: 'biAutoAvailability',
    async execute(client, chanid, roleid){    
        var stream = fs.createWriteStream("./messageIDs/biAvailabilityMessageIds.txt", {flags:'a'});

        await client.channels.cache.get(chanid.id).send("<@&" + roleid + ">\n" + 
        'Monday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })

        client.channels.cache.get(chanid.id).send( 
        'Tuesday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })

        client.channels.cache.get(chanid.id).send( 
        'Wednesday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })

        client.channels.cache.get(chanid.id).send( 
            'Thursday').then(async function (message){
                stream.write(message.id + "\n");
    
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');
    
        })

        client.channels.cache.get(chanid.id).send( 
        'Friday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })

        client.channels.cache.get(chanid.id).send( 
        'Saturday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })

        client.channels.cache.get(chanid.id).send(
        'Sunday').then(async function (message){
            stream.write(message.id + "\n");

            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

        })
    }
}