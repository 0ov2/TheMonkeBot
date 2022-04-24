const expect = require('chai').expect
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});
client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('././commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`../commands/${file}`);
    
    client.command.set(command.name, command);
}

describe('Test different commands', async () => {
    it('Test DB connections', async () => {
        const connection1 = await client.command.get('dbconnection').execute("true");
        const connection2 = await client.command.get('dbconnection').execute("false");
        
        expect(connection1).to.be.a('Object')
        expect(connection2).to.be.a('Object')
        
        connection1.end();
        connection2.end();
    })
    
    it('Test that channels are returned properly', () => {
        const getChannel = require("../commands/getChannelId");
        expect(getChannel(client, 'op-match-announcement')).to.be.a('string').that.equals("Channel doesn't exist");
    })
})