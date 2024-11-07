const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const Logger = require('./logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const logger = new Logger(client);

client.once(Events.ClientReady, () => {
  console.log('Ready!');
  logger.updateServerList();
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  const { cooldowns } = require('./config.json');
  const { permissions } = require('./config.json');

  if (!interaction.member.permissions.has(permissions[command.category])) {
    return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
  }

  const now = Date.now();
  const cooldownAmount = (cooldowns[command.category] || 3) * 1000;

  if (client.cooldowns.has(interaction.user.id)) {
    const expirationTime = client.cooldowns.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing this command.`, ephemeral: true });
    }
  }

  client.cooldowns.set(interaction.user.id, now);
  setTimeout(() => client.cooldowns.delete(interaction.user.id), cooldownAmount);

  try {
    await command.execute(interaction);
    logger.log('commands', `User ${interaction.user.tag} executed command: ${interaction.commandName}`);
  } catch (error) {
    console.error(error);
    logger.logError(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(token);