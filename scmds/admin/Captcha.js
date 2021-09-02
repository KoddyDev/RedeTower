const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'captcha',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de captcha.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.editReply(`Você não possui permissão para utilizar esse comando!`);
        const btn = new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Verificar")
        .setEmoji("854929181133766676")
        .setCustomId('captcha')
        
        interaction.channel.send(
            {embeds: [
                {
                    title: `
                    <:aviso:854929386394615848> **CAPTCHA!**`,
                    description: `  Olá querido jogador, tudo bem?
                    
                    Esse é nosso **__sistema__** de **__captcha__**, para visualizar 
                    nosso Discord, basta clicar no botão á baixo! :wink:
                    
                    <:alerta_h:854929287525957642> Atenciosamente, Equipe Tower`,
                    color: "DARK_ORANGE"
                    
                  
                }
            ],
        components: [new Discord.MessageActionRow().addComponents(btn)]
     })
        }
}