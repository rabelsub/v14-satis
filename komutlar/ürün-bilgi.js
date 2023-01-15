//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!
const { ButtonBuilder } = require("discord.js");
const { ActionRowBuilder } = require("discord.js");
const { EmbedBuilder, Client, CommandInteraction } = require("discord.js");
const data = require("../models/urun");
module.exports = {
  name: "ürün-bilgi",
  description: "Ürün Bilgi",
  type: 1,
  options: [
    {
      name: "ürün-kodu",
      description: "Ürün Kodu",
      type: 4,
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const hataembed = new EmbedBuilder();
    let _data = await data.findOne({urunKodu: interaction.options.getInteger("ürün-kodu")});
    if (!_data) {
      hataembed.setTitle("Ürün Bulunamadı");
      hataembed.addFields({ name: 'Veri Sorunu', value: 'Veri Bulunamadı veya Bulunan Veriler Eksik...' });
      hataembed.setColor(0xc03939)
      return interaction.reply({embeds:[hataembed]});
    }

    let embed = new EmbedBuilder()
    .setTitle(`${_data.name} adlı ürün bilgisi`)
    .setDescription(`${_data.desc}`)
    .setFields([
      {name: "Ürün Fiyatı", value: `${_data.fiyat}TL`, inline: true},
      {name: "Ürün Açıklaması", value: `${_data.desc}`, inline: true},
    ])
    .setFooter({text: `Ürün Kodu: ${_data.urunKodu} | Developed For RabeL By Ege And Can`})
    .setThumbnail(client.user.avatarURL())
    .setImage(`${_data.foto}`)

    let butonlar = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`al-${_data.urunKodu}`).setLabel("Ürünü Satın Al").setEmoji("<:rabelium:958298296865144843>").setStyle("Success"),
      new ButtonBuilder().setCustomId(`sepet-${_data.urunKodu}`).setLabel("Ürünü Sepete Ekle").setEmoji("🛒").setStyle("Secondary"),
    )

    interaction.reply({embeds:[embed],components: [butonlar]});

   
  },
};
//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!