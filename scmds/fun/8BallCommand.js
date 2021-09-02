const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: '8ball',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Perguntar ao bot alguma coisa.',
    usage: '',
    options: [
        {
            name: "pergunta",
            description: "Pergunta para o bot.",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let user;
        if(interaction.options.get("pergunta")) {
            user = interaction.options.get("pergunta").value
        }
        let i = ["Sim.",
        "Não.",
        "Talvez.",
        "Eu não sei, tente de novo.",
        "Quem sabe?",
        "Isso é um mistério.",
        "Não posso te contar.",
        "Meu informante disse que não.",
        "Provavelmente.",
        "Me pergunte mais tarde.",
        "Claro que não!",
        "Não conte comigo para isso.",
        "Dúvido muito.",
        "NUNCA!",
        "Não quero responder, agora estou no zapzap.",
        "Mais é claro.",
        "Certeza que sim.",
        "COM CERTEZA!",
        "Não sei ao certo."]
    
        let y = i[Math.floor(i.length * Math.random())]

        interaction.editReply(`:8ball: Eu acho que a resposta de \`${user}\` é \`${y}\``)
    }
}