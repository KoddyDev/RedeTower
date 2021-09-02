const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tableflip',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Envia e edita a mensagem com varias carinhas',
    usage: '',
        /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {

const frames = [
    '(-°□°)-  ┬─┬',
    '(╯°□°)╯    ]',
    '(╯°□°)╯  ︵  ┻━┻',
    '(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬'
];
    interaction.editReply('(\\\\°□°)\\\\  ┬─┬');
    for (const frame of frames) {
        setTimeout(() => {}, 4000);
        interaction.editReply(frame);
    }
    return message;
}

}