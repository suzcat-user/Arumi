const {
  EmbedBuilder,
  PermissionsBitField,
  ButtonStyle,
  APIMessage,
  TextInputStyle,
  TextInputBuilder,
  ModalBuilder,
} = require("discord.js");
const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("editgw")
    .setDescription("Edit a certain aspect of a giveaway")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("colour")
        .setDescription("Changes the colour of a giveaway embed")
        .addStringOption((option) =>
          option
            .setName("colour")
            .setDescription("Change the colour of a giveaway via hex colour")
        )
        .addStringOption((option) => 
        option
        .setName('message_id')
        .setDescription('ID of the giveaway (message ID)'))
    ),
  run: async (client, interaction) => {},
};
