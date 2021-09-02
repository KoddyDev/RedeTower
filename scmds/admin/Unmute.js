const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: 'desmutar',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Faça um membro deste discord aprender novamente á falar.',
    usage: '',
    options: [
        {
            name: "user",
            type: "USER",
            description: "Selecione o usuario nescessário!",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const usuario = interaction.options.get("user")
        const mb = usuario.member
        const us = usuario.user
        if(!interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.editReply({
            embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`<:aviso:854929386394615848> Você não tem permissão para isso.`).setColor("ORANGE")]
        })
        if(!mb) return interaction.editReply({embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`<:aviso:854929386394615848> Usuário não encontrado.`).setColor("ORANGE")]})

        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role ) {
            try {
                interaction.channel.send({
                    embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`O cargo **__muted__** não foi encontado, criando outro...`).setColor("ORANGE")]
                })

                let muterole = await interaction.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                interaction.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                interaction.channel.send(new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`Cargo **_[<&@${muterole.id}>]__**, criado com sucesso.`).setColor("ORANGE"))
            } catch (error) {
                console.log(error)
            }
        }
        let role2 = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(!mb.roles.cache.has(role2.id)) return interaction.editReply(`\`${us.tag}\` não está mutado.`)
        await mb.roles.add(role2)

        interaction.guild.channels.cache.get(`844251449391448085`).send({
            embeds: [
                new Discord.MessageEmbed()
        .setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`<:alerta_h:854929287525957642> ➠ **Membro desmutado:** ${us} \n <:3857_pepe_police:854927430850445313> ➠ **Desmutado por:** ${interaction.user}`).setFooter(`ID do usuário silenciado: ${mb.id}`).setThumbnail(mb.displayURL).setColor(`ORANGE`)
            ]
        })
        interaction.editReply({
            embeds: [
                new Discord.MessageEmbed()
        .setTitle("<:grade:839619780654006274> Desmutar!").setDescription(`<:alerta_h:854929287525957642> ➠ **Membro desmutado:** ${us} \n <:3857_pepe_police:854927430850445313> ➠ **Desmutado por:** ${interaction.user}`).setFooter(`ID do usuário silenciado: ${mb.id}`).setThumbnail(mb.displayURL).setColor(`ORANGE`)
            ]
        })
    }
}