const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Visualizar o comando de ping.',
    usage: '',
        /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        let pingEmbed = new Discord.MessageEmbed() 
        .setTitle(`<:ping:788215814385303592> PING!`)
        .setColor('ORANGE')
        .setThumbnail(interaction.user.displayAvatarURL())
        .setDescription(`<a:carregar:859862232838176808> Calculando...`)
        .setFooter(interaction.user.tag, interaction.user.avatarURL)
        .setTimestamp(new Date())
    
        let embed2 = new Discord.MessageEmbed() 
        .setTitle(`<:ping:788215814385303592> PING!`)
        .setColor('ORANGE')
        .setThumbnail(interaction.user.displayAvatarURL())
        .setDescription("<:hm:854927325330014260> Espero que não esteja alto...")
        .setFooter(interaction.user.tag, interaction.user.avatarURL)
        .setTimestamp(new Date())
    
        let embed_ping = new Discord.MessageEmbed() 
        .setTitle(`<:ping:788215814385303592> PING!`)
        .setColor('ORANGE')
        .setFooter(interaction.user.tag, interaction.user.avatarURL)
        .setTimestamp(new Date())
        .setThumbnail(interaction.user.displayAvatarURL())
        .addField(`📡 Ping`, 
            `\`${parseInt(client.ws.ping)}\` ms\n`)
        .addField(`<:aviso:854929386394615848> Ajuda`,

            `Use \`/ajuda\` para ver mais comandos.`
            )
    
        interaction.editReply({embeds: [pingEmbed]}) 
        setTimeout(() => { 
            interaction.editReply({embeds: [embed2]})
        }, 2000) 
        setTimeout(() => { 
            interaction.editReply({embeds: [embed_ping]})
        }, 4000)
    
    }
}