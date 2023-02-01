const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns with my calculated ping from the Discord API"),
    run: async (client, interaction) => {
      interaction.reply(`${client.ws.ping}ms!`)
    }
 };
