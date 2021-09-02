const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: 'mutar',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Faça um membro deste discord não saber falar.',
    usage: '',
    options: [
        {
            name: "user",
            type: "USER",
            description: "Selecione o usuario nescessário!",
            required: true
        },
        {
            name: "tempo",
            type: "STRING",
            description: "Tempo que o usuario ficará mutado",
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
        const time = interaction.options.get("tempo").value
        if(!interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.editReply({
            embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> MUTE!").setDescription(`<:aviso:854929386394615848> Você não tem permissão para isso.`).setColor("ORANGE")]
        })
        if(!mb) return interaction.editReply({embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> MUTE!").setDescription(`<:aviso:854929386394615848> Usuário não encontrado.`).setColor("ORANGE")]})
        if(!time) return interaction.editReply({
            embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> MUTE!").setDescription(`<:aviso:854929386394615848> Coloque um tempo válido.\n**Exemplo:** 1s, 1m, 1d`).setColor("ORANGE")]
        })
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                interaction.channel.send({
                    embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> MUTE!").setDescription(`O cargo **__muted__** não foi encontado, criando outro...`).setColor("ORANGE")]
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
                interaction.channel.send(new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> MUTE!").setDescription(`Cargo **_[<&@${muterole.id}>]__**, criado com sucesso.`).setColor("ORANGE"))
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(mb.roles.cache.has(role2.id)) return interaction.editReply(`${mb.displayName} já está mutado.`)
        await mb.roles.add(role2)

        interaction.guild.channels.cache.get(`844251449391448085`).send({
            embeds: [
                new Discord.MessageEmbed()
        .setTitle("<:grade:839619780654006274> MUTE!").setDescription(`<:alerta_h:854929287525957642> ➠ **Membro mutado:** ${us} \n <:3857_pepe_police:854927430850445313> ➠ **Mutado por:** ${interaction.user} \n <:clock2:859950884287807508> ➠ **Duração:** ${time}`).setFooter(`ID do usuário silenciado: ${mb.id}`).setThumbnail(mb.displayURL).setColor(`ORANGE`)
            ]
        })
        interaction.editReply({
            embeds: [
                new Discord.MessageEmbed()
        .setTitle("<:grade:839619780654006274> MUTE!").setDescription(`<:alerta_h:854929287525957642> ➠ **Membro mutado:** ${us} \n <:3857_pepe_police:854927430850445313> ➠ **Mutado por:** ${interaction.user} \n <:clock2:859950884287807508> ➠ **Duração:** ${time}`).setFooter(`ID do usuário silenciado: ${mb.id}`).setThumbnail(mb.displayURL).setColor(`ORANGE`)
            ]
        })
        setTimeout(async () => {
            await mb.roles.remove(role2)
            interaction.channel.send({
                embeds: [new Discord.MessageEmbed().setTitle("<:grade:839619780654006274> UNMUTE!").setDescription(`${us} se arrependeu e acabou aprendendo á falar de novo.`).setColor("ORANGE")]
            })
        }, ms(time))
    }
}