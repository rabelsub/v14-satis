//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!
const { MessageEmbed, Client, CommandInteraction, PermissionsBitField, EmbedBuilder } = require("discord.js");
const data = require("../models/urun");
module.exports = {
  name: "ürün-sil",
  description: "Ürün siler",
  default_member_permissions:0x0000000000000008,
  type: 1,
  options: [
    {
      name: "ürün-kodu",
      description: "ürün kodu",
      type: 4,
      required: true,
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds:[{title:"Bu Komutu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısınız!", color:0xc03939}],ephemeral:true});
    const uyok = new EmbedBuilder();
    let kod = interaction.options.getInteger("ürün-kodu");
    let urun = await data.findOne({urunKodu:kod });
    if(!urun) {
      uyok.setTitle("Ürün Bulunamadı");
      uyok.addFields({ name: 'Veri Sorunu', value: 'Verilerde Böyle Bir Ürün Yok.' });
      uyok.setColor(0xc03939)
      return interaction.reply({embeds:[uyok]});
    }

      await data.deleteOne({urunKodu:kod})
      interaction.reply({embeds:[{
        title: "Ürün Silindi",
        color:0x00FF00,
        description: `${kod} kodlu ürün silindi.`,
      }]})
    
  },
};
//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!