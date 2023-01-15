//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!
const { MessageEmbed, Client, CommandInteraction, MessageActionRow, MessageButton, MessageSelectMenu, EmbedBuilder } = require("discord.js");
const sepet = require("../models/sepet");
module.exports = {
  name: "ping",
  description: "botun gecikme değeri",
  type: 1,
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
  const ping = new EmbedBuilder();
  ping.setTitle("Ping Pong!");
  ping.addFields({ name: 'Ping Değerlerim', value: `Ping: **${client.ws.ping}ms**` });
  ping.setColor(0xeaff8e)
  interaction.reply({embeds:[ping]})
  },
};
//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!