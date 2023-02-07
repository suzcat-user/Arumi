const { EmbedBuilder, PermissionsBitField, ButtonStyle, APIMessage, TextInputStyle, TextInputBuilder, ModalBuilder} = require("discord.js");
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gcreate")
    .setDescription("Create a giveaway through simple yet interactive means"),
    run: async (client, interaction) => {
      const modal = new ModalBuilder()
			.setCustomId('gwmodal')
			.setTitle('Giveaway Setup');

            const prizeInput = new TextInputBuilder()
			.setCustomId('prizeInput')
			.setLabel("What is the prize of the giveaway?")
            .setPlaceholder('E.g. Discord Nitro')
			.setStyle(TextInputStyle.Short);

            const winnerInput = new TextInputBuilder()
            .setCustomId('winnerInput')
            .setLabel('How many winners will there be?')
            .setPlaceholder('E.g. 4')
            .setStyle(TextInputStyle.Short);

            const timeInput = new TextInputBuilder()
            .setCustomId('timeInput')
            .setLabel('How long will the giveaway be?')
            .setPlaceholder('E.g. 4 hours')
            .setStyle(TextInputStyle.Short);
            
            const channelInput = new TextInputBuilder()
            .setCustomId('channelInput')
            .setLabel('What is the name of the giveaway channel?')
            .setPlaceholder('E.g. Giveaways')
            .setStyle(TextInputStyle.Short)

            const winnerRow = new ActionRowBuilder().addComponents(winnerInput)
            const timeRow = new ActionRowBuilder().addComponents(timeInput)
            const prizeRow = new ActionRowBuilder().addComponents(prizeInput);
           const channelRow = new ActionRowBuilder().addComponents(channelInput)

            modal.addComponents(prizeRow, winnerRow, timeRow, channelRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    }
 };
