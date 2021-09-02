const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'link',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Ver os links da nossa rede',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  

        let Embed = new Discord.MessageEmbed()
        .setTitle(`<:mineplaneta:855440184014012427> LINKS DA REDE!`)
        .setDescription(`<a:carregar:859862232838176808> Para acessar **__todos__** os nossos links, clique **[AQUI](https://redetower.com.br/links)**. \n`)
        .setColor(`ORANGE`)
 await interaction.editReply({
     embeds: [Embed]
 }); 

}
}