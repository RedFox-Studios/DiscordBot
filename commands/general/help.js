const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const pagination = require('../../utils/pagination');

module.exports = {
  category: 'general',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all commands or info about a specific command')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The specific command to see info about')
        .setRequired(false)),
  async execute(interaction) {
    const { commands } = interaction.client;
    const { options } = interaction;

    const commandName = options.getString('command');
    if (commandName) {
      const command = commands.get(commandName);
      if (!command) {
        return interaction.reply(`No command with name \`${commandName}\` found.`);
      }

      const embed = new EmbedBuilder()
        .setTitle(`Command: ${command.data.name}`)
        .setDescription(command.data.description)
        .addFields(
          { name: 'Category', value: command.category },
          { name: 'Usage', value: command.data.options ? command.data.options.map(option => `${option.name}: ${option.description}`).join('\n') : 'No options' }
        );

      return interaction.reply({ embeds: [embed] });
    }

    const categories = [...new Set(commands.map(command => command.category))];
    const pages = categories.map(category => {
      const categoryCommands = commands.filter(command => command.category === category);
      return new EmbedBuilder()
        .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands`)
        .setDescription(categoryCommands.map(command => `**${command.data.name}**: ${command.data.description}`).join('\n'));
    });

    pagination(interaction, pages);
  },
};