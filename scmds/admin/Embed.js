const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de embed.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        interaction.editReply("Qual é o texto?")

        const filter = x => x.author.id == interaction.user.id
        let c2 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
        c2.on("collect", async c => {
            const sayMessage = c.content
            if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`**Você não tem permissão para utilizar esse comando**`)
                const embed = new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setDescription(sayMessage)
                await interaction.channel.sendTyping()
                setTimeout(() => {
                    interaction.channel.send({
                        embeds: [embed]
                    })
                }, ((c.content.length > 5 ? 4000 : 1500)))
        })
    }
}