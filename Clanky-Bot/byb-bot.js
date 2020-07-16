const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const mysql = require('mysql2');

const { prefix, token, password, database, user } = require('./config.json');
const players = require('./players.js');



const client = new Discord.Client();
client.commands = new Discord.Collection();

var dns = require('dns');
var w3 = dns.lookup('fatcow.com', function (err, addresses, family) {
  console.log(addresses);
});

const sequelize = new Sequelize('byb_scheduler', 'jibbodahibbo', 'Clanky123!', {
	host: 'snailmemescom.fatcowmysql.com',
	dialect: 'mysql',
	port:'3306'
});


sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});




const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
