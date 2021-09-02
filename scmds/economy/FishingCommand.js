const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
    name: 'pescar',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Pesque items no lago!',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
    }
}