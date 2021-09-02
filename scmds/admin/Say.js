const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'falar',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Faça o bot falar o texto que você digitar!.',
    usage: '',
    options: [
        {
            name: "texto",
            type: "STRING",
            description: "Escolha uma mensagem!",
            required: true
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const texto = interaction.options.get("texto").value

        if(!texto) return interaction.editReply("<:aviso:854929386394615848> Insira um texto para que eu fale. `t.say <texto>`");

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.editReply(`Você não possui permissão para utilizar esse comando!`);
    
        interaction.channel.send({
            content: texto
        });

    }
}