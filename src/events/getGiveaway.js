const {
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ComponentType,
  ChannelType,
} = require("discord.js");
const em =require('enhanced-ms') 
const giveaway = require('../functions/giveaway')
module.exports = {
  name: "interactionCreate",
  execute: async (interaction) => {
    let client = interaction.client;
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "gwmodal") {
       
      const prize = interaction.fields.getTextInputValue("prizeInput");
      const winner = interaction.fields.getTextInputValue("winnerInput");
      const time = interaction.fields.getTextInputValue("timeInput");
      const channel = interaction.fields.getTextInputValue("channelInput");
      const host = interaction.user.id;

      const searchChannel =
        interaction.guild.channels.cache.find(
          (chn) => chn.name === channel
        ) || interaction.guild.channels.cache.get(channel); 

      const gw = { prize, winner, time, channel, host,client,searchChannel };
      createGiveaway(gw);
       giveaway.giveaway(gw)
    }
    async function createGiveaway(gw) {
      const gwchannel =
        interaction.guild.channels.cache.find(
          (chn) => chn.name === gw.channel
        ) || interaction.guild.channels.cache.get(gw.channel);

      if (!gwchannel)
        await interaction.reply({
          content:
            "I couldn't resolve that message to a channel! In which channel should I send the giveaway to?\n**Please tell me in what channel to post the giveaway by saying  name or ID**.",
          ephemeral: true,
        });
      if (isNaN(parseInt(gw.winner)) || parseInt(gw.winner) > 20)
        await interaction.reply({
          content:
            "The amount of winners you have stated is a number.\n**Make sure the amount of winners for the giveaway is from 1-20**",
          ephemeral: true,
        });
        
        if(em(gw.time) === null) await interaction.reply({content: 'The duration of the giveaway you stated doesn\'t seem to be a correct duration. If you want the duration of the giveaway to be 1 hour 30 minutes you can do **1hr 30mins**',ephemeral: true })
      await interaction.reply({ content: `**Giveaway Successfully Created!**\nThe giveaway has been created in <#${gw.searchChannel.id}>! Good luck to everyone participating in it!`, ephemeral: true});
    }
  },
};
