const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async (interaction, pages, timeout = 120000) => {
  if (!pages || !pages.length) return;

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('first')
        .setLabel('<<')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('prev')
        .setLabel('<')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('>')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('last')
        .setLabel('>>')
        .setStyle(ButtonStyle.Primary)
    );

  let currentPage = 0;

  const curPage = await interaction.reply({
    embeds: [pages[currentPage].setFooter({ text: `Page ${currentPage + 1} / ${pages.length}` })],
    components: [row],
    fetchReply: true
  });

  const filter = i => i.customId === 'first' || i.customId === 'prev' || i.customId === 'next' || i.customId === 'last';
  const collector = curPage.createMessageComponentCollector({ filter, time: timeout });

  collector.on('collect', async i => {
    if (i.customId === 'first') currentPage = 0;
    if (i.customId === 'prev') currentPage = currentPage > 0 ? --currentPage : pages.length - 1;
    if (i.customId === 'next') currentPage = currentPage + 1 < pages.length ? ++currentPage : 0;
    if (i.customId === 'last') currentPage = pages.length - 1;

    await i.update({
      embeds: [pages[currentPage].setFooter({ text: `Page ${currentPage + 1} / ${pages.length}` })],
      components: [row]
    });
  });

  collector.on('end', () => {
    curPage.edit({ components: [] });
  });

  return curPage;
};