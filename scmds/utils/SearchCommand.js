const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'google',
    categories : 'Utils', 
    description: 'Realizar uma pesquisa na internet.',
    usage: '',
    options: [
        {
            name: "pesquisa",
            description: "Digite o termo de pesquisa.",
            type: 3,
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  const link = interaction.options.get("pesquisa").value
        const embed = new Discord.MessageEmbed()
        .setTitle (`<a:carregar:859862232838176808> GOOGLE!`)
        .setColor('ORANGE') //escolha uma cor 
        .setDescription (`<:aviso:854929386394615848> Para ir até sua pesquisa, clique **[AQUI](https://www.google.com/search?q=${link})**.`)
        .setImage ("https://i.pinimg.com/originals/3d/33/f1/3d33f1635eb1a598c9ffb68ae23d3b81.gif")

 await interaction.editReply({
     embeds: [embed]
 }); 

}
}