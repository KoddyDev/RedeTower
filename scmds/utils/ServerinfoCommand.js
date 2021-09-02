const Discord = require("discord.js"); 
const { Client, CommandInteraction } = require('discord.js');
  
  
const moment = require("moment");
moment.locale("pt-BR");
const ms = require("ms");

module.exports = {
    name: 'serverinfo',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver as informações deste servidor',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {


          let icon = interaction.guild.iconURL;
          const sinfoembed = new Discord.MessageEmbed()
          .setTitle(`<:discord:859841711625469972> SERVER INFO!`)
          .setColor("ORANGE")
          .setThumbnail(interaction.guild.iconURL())
          .setTimestamp()
          .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL())
          .setDescription(`<:foguete:839610476903530536> ➠ **Dono:** ${(await interaction.guild.fetchOwner()).user.tag} \n :flag_br: ➠ **Região:** Brasil \n <:repetidor:856288765886464050> ➠ **Criado em:** ${moment.utc(interaction.guild.createdAt).format("DD/MM/YYYY")} \n <:machado:856293916341174312> ➠ **Cargos:** ${interaction.guild.roles.cache.size -1} \n <:pepecalcinha:854927220602175499> ➠ **Emojis:** ${interaction.guild.emojis.cache.size} \n <:bussola:854928664893980672> ➠ **Canais:** ${interaction.guild.channels.cache.size} \n <:alerta_h:854929287525957642> ➠ **Membros:** ${interaction.guild.memberCount}`)
 await interaction.editReply({
     embeds: [sinfoembed]
 }); 

}
}