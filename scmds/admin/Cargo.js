const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: 'cargo',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de cargo.',
    usage: '',
    options: [
        {
            name: "escolha",
            type: "INTEGER",
            description: "Selecione o que deseja fazer",
            required: true,
            choices: [
                {
                    name: "Adicionar Cargo de Todos",
                    value: 1
                },
                {
                    name: "Remover Cargo de Todos",
                    value: 2
                }
            ]
        },
        {
            name: "cargo",
            type: "ROLE",
            description: "Selecione o cargo!",
            required: true
        },
    ],
        permissions: [
        {
            id: "787816334565572639",
            type: 1,
            permission: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.editReply("Sem permissão.")
        const oqfzrr = interaction.options.get("escolha").value

        const cargo = interaction.options.get("cargo").role

        const embed = new Discord.MessageEmbed()
        .setTitle(`${oqfzrr === 1 ? "Adição":"Remoção"} de cargo`)
        .setDescription(`Eu estou ${oqfzrr === 1 ? "adicionando" : "removendo"} o cargo <@&${cargo.id}> de todo mundo.
        O tempo total é de um usuario a cada 2 segundos, ou seja, ${ms(oqfzrr === 1 ? interaction.guild.members.cache.filter(m => !m.roles.cache.has(cargo.id)).size * 2 * 1000 : interaction.guild.members.cache.filter(m => m.roles.cache.has(cargo.id)).size * 2 * 1000)}.

Total de membros para ${oqfzrr === 1 ? "adicionar":"remover"} o cargo: ${oqfzrr === 1 ? interaction.guild.members.cache.filter(m => !m.roles.cache.has(cargo.id)).size : interaction.guild.members.cache.filter(m => m.roles.cache.has(cargo.id)).size}`)

        
            oqfzrr === 1 ? 
            interaction.guild.members.cache.filter(m => !m.roles.cache.has(cargo.id)).forEach((member, i) => {
                setTimeout(() => {
                    member.roles.add(cargo.id)
                }, 2000)
            })
             : 
             cargo.members.forEach((member) => { // Looping through the members of Role.
                setTimeout(() => {
                    member.roles.remove(cargo.id); // Removing the Role.
                }, 2000);
            })
            
            const embed2 = new Discord.MessageEmbed()
            .setTitle("Finalização")
            .setDescription(`Acabei de ${oqfzrr === 1 ? "adicionar" : "remover"} o cargo <@&${cargo.id}>. Tchau!`)
            setTimeout(() => {
                interaction.channel.send({
                    embeds: [embed2],
                    content: `${interaction.user}`
                })
            }, (oqfzrr === 1 ? interaction.guild.members.cache.filter(m => !m.roles.cache.has(cargo.id) ).size * 2 * 1000 : interaction.guild.members.cache.filter(m => m.roles.cache.has(cargo.id)).size * 2 * 1000))
            console.log((oqfzrr === 1 ? interaction.guild.members.cache.filter(m => !m.roles.cache.has(cargo.id)).size * 2 * 1000 : interaction.guild.members.cache.filter(m => m.roles.cache.has(cargo.id)).size * 2 * 1000))
        interaction.editReply({
            embeds: [
                embed
            ]
        })
    }
}