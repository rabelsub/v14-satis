//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!
const {
  MessageEmbed,
  Client,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  PermissionsBitField
} = require("discord.js");
const data = require("../models/kodlar");
module.exports = {
  name: "kod-üret",
  // default_member_permissions:0x0000000000000008,
  description: "Rastgele kod üretir",
  type: 1,
  options: [
    {
      name: "kullanım",
      description: "Kodu kaç kez kullanılabilir?",
      type: 4,
      required: true,
    },
    {
      name: "değer",
      description: "kod değeri (TL Cinsinden)",
      type: 4,
      required: true,
    },
    {
      name: "limit",
      description: "minimum alışveriş tutarı",
      type: 4,
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds:[{title:"Bu Komutu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısınız!", color:0xc03939}],ephemeral:true});
    await interaction.reply({content:"Kod üretiliyor..."});
    var randomPsw = "";
    var kullanım = interaction.options.getInteger("kullanım");
    var deger = interaction.options.getInteger("değer");
    var limit = interaction.options.getInteger("limit");
    do {
      var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      var lengthPsw = 7;
      for (var i = 0; i < lengthPsw; i++) {
        var numPws = Math.floor(Math.random() * character.length);
        randomPsw += character.substring(numPws, numPws + 1);
      }
    } while (await data.findOne({ kod: randomPsw }));

    await data.create({kod:randomPsw,maxKullanım:kullanım,deger,limit,authorId:interaction.member.id,durum:true,tarih:new Date()});
    interaction.editReply({ content: `Kod Üretildi: ${randomPsw}` });
  },
};
//Bu Altyapı Ege ve Can Tarafından RabeL Sunucusu İçin Hazırlanmıştır!