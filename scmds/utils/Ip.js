const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ip',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Ver o IP do servidor.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
  

        let Embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("<a:aA_Estrelinhas:854941291108237322> REDETOWER!")
        .setDescription(`<:mineplaneta:855440184014012427> ➠ **Versão:** 1.8 à 1.17 \n <:ping:788215814385303592> ➠ **IP:** jogar.redetower.com.br`)
        .setThumbnail(`https://api.mcsrvstat.us/icon/147.135.64.147:10145.tld`)

 await interaction.editReply({
     embeds: [Embed]
 }); 

}
}