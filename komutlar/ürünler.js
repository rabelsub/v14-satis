//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!
const { MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { EmbedBuilder, Client, CommandInteraction, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const data = require("../models/urun");
module.exports = {
  name: "ürünler",
  description: "Ürün Listesi",
  type: 1,
  options: [
    {
      name: "kategori",
      description: "Ürün Kategorisi",
      type: 3,
      autocomplete: true,
     
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const hataembed = new EmbedBuilder();
    let _data = await data.find();
    if (!_data || _data.length <= 0) {
      hataembed.setTitle("Ürün Bulunamadı");
      hataembed.addFields({ name: 'Veri Sorunu', value: 'Veri Bulunamadı veya Bulunan Veriler Eksik...' });
      hataembed.setColor(0xc03939)
      return interaction.reply({embeds:[hataembed]});
    }

    const kategori = interaction.options.get("kategori")
      ? interaction.options.get("kategori").value
      : null;

    const embed = new EmbedBuilder();
    if (kategori) {
      let dat = _data
        .filter((x) => x.ktgry == kategori)
        .sort((a, b) => b.fiyat - a.fiyat);
      if (dat.length > 0) {
        
        let optins = [];
        let fields = [];
        embed.setTitle(
          `${interaction.options.get("kategori").value.charAt(0).toUpperCase()+interaction.options.get("kategori").value.slice(1)} Bot Listesi`
        );
        dat.forEach((x) => {
          fields.push({name: `${x.name}`, value: `Fiyat: ${x.fiyat}\nürün kodu: ${x.urunKodu}`, inline: true});
          optins.push({label: `${x.name}`, value: `${x.urunKodu}`, emoji:"<a:star5:761479712743620608>"});

        });
        embed.setFields(fields)
        interaction.reply({embeds:[embed],components:[new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder().setPlaceholder("Görmek istediğiniz ürünü seçin").setCustomId("ürün-liste").setMaxValues(1).setMinValues(1)
          .setOptions(optins))]});
      } else {
        return interaction.reply({embeds:[hataembed]});
      }
    } else {
      let dat = _data.sort((a, b) => b.fiyat - a.fiyat);
      if(!dat || dat.length == 0) return interaction.reply({embeds:[hataembed]});
      let optins = [];
      let fields = [];
      if (dat) {
        embed.setTitle(`Tüm Botlar Listesi`);
        dat.forEach((x) => {
          fields.push({name: `${x.urunKodu} | ${x.name}`, value: `Fiyat: **${x.fiyat}TL**`, inline: true})
          optins.push({label: `${x.name}`, value: `${x.urunKodu}`, emoji:"<a:star5:761479712743620608>"});
        });

        if(!optins.length || optins.length == 0) return interaction.reply({embeds:[hataembed]})

        embed.setFields(fields);
        interaction.reply({embeds:[embed],components:[new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder().setPlaceholder("Görmek istediğiniz ürünü seçin").setCustomId("ürün-liste").setMaxValues(1).setMinValues(1)
          .setOptions(optins))]});
      } else {
        return interaction.reply({embeds:[hataembed]});
      }
    }
  },
};
//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!